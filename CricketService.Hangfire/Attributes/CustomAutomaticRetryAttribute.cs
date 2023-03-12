﻿using CricketService.Hangfire.Configs;
using Hangfire;
using Hangfire.Common;
using Hangfire.States;
using Hangfire.Storage;
using Microsoft.Extensions.Options;

namespace CricketService.Hangfire.Attributes
{
    public class CustomAutomaticRetryAttribute :
            JobFilterAttribute,
            IElectStateFilter,
            IApplyStateFilter
    {
        private readonly AutomaticRetryAttribute _automaticRetryAttribute;

        public CustomAutomaticRetryAttribute(IOptions<HangfireOptions> hangfireOptionsAccessor)
        {
           // Precondition.IsNotNull(hangfireOptionsAccessor, nameof(hangfireOptionsAccessor));

            _automaticRetryAttribute = new AutomaticRetryAttribute();

            var hangfireOptions = hangfireOptionsAccessor.Value;
            _automaticRetryAttribute.Attempts = hangfireOptions.AutomaticRetryAttempts;
            _automaticRetryAttribute.DelayInSecondsByAttemptFunc =
                GetDelayInSecondsByAttemptFunc(
                    hangfireOptions.DelayInSecondsFuncBase,
                    hangfireOptions.DelayInSecondsFuncJitterMaxValue);
        }

        public static Func<long, int> GetDelayInSecondsByAttemptFunc(
            int backOffBase,
            int jitterMaxValue)
        {
            Func<long, int> retryFunction = retryAttempt =>
            {
                var jitterer = new Random();
                var exponentialBackOff = (int)Math.Pow(backOffBase, retryAttempt);
                var jitter = jitterer.Next(0, jitterMaxValue);
                return exponentialBackOff + jitter;
            };

            return retryFunction;
        }

        public void OnStateApplied(
            ApplyStateContext context,
            IWriteOnlyTransaction transaction)
            => _automaticRetryAttribute.OnStateApplied(context, transaction);

        public void OnStateElection(ElectStateContext context)
            => _automaticRetryAttribute.OnStateElection(context);

        public void OnStateUnapplied(
            ApplyStateContext context,
            IWriteOnlyTransaction transaction)
            => _automaticRetryAttribute.OnStateUnapplied(context, transaction);
    }
}