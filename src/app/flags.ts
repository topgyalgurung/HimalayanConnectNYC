// flags.ts
import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";

export const identify = dedupe((async () => ({
  // implement the identify() function to add any additional user properties you'd like, see docs.statsig.com/concepts/user
  userID: "1234" //for example, set userID
})) satisfies Identify<StatsigUser>);

export const createFeatureFlag = (key: string) => flag<boolean, StatsigUser>({
  key,
  adapter: statsigAdapter.featureGate((gate) => gate.value, {exposureLogging: true}),
  identify,
});