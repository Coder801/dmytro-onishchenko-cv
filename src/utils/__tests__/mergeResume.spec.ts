import { describe, expect, it } from "vitest";

import { Resume } from "@/types/resume";

import { mergeResume } from "../mergeResume";

const baseResume: Resume = {
  profile: {
    name: { first: "Jane", last: "Doe" },
    position: "Software Engineer",
    location: "Kyiv, Ukraine",
    phone: "+380000000000",
    email: "jane@example.com",
    skills: ["JavaScript", "React"],
    allSkills: ["JavaScript", "React", "Node"],
    social: [],
  },
  summary: {
    title: "Summary",
    intro: "Base intro.",
    items: [],
  },
  workHistory: [
    {
      company: "Acme",
      position: "Engineer",
      date: ["2020-01", "2021-01"],
      description: "Base description.",
      keyAchievements: ["Base achievement."],
    },
  ],
  education: [],
  achievements: [],
  languages: [],
};

describe("mergeResume", () => {
  it("returns the base resume unchanged when no overrides are given", () => {
    expect(mergeResume(baseResume)).toEqual(baseResume);
  });

  it("applies a single nested-field override without touching sibling fields", () => {
    const result = mergeResume(baseResume, {
      summary: { intro: "Tailored intro." },
    });

    expect(result.summary.intro).toBe("Tailored intro.");
    expect(result.summary.title).toBe("Summary");
    expect(result.profile).toEqual(baseResume.profile);
  });

  it("replaces arrays wholesale instead of merging by index", () => {
    const result = mergeResume(baseResume, {
      profile: { skills: ["Python"] },
    });

    expect(result.profile.skills).toEqual(["Python"]);
    expect(result.profile.allSkills).toEqual(baseResume.profile.allSkills);
  });

  it("deep-merges nested objects", () => {
    const result = mergeResume(baseResume, {
      profile: { name: { first: "Jane-Override" } },
    });

    expect(result.profile.name).toEqual({ first: "Jane-Override", last: "Doe" });
  });

  it("applies multiple overrides in order, later overrides winning", () => {
    const result = mergeResume(
      baseResume,
      { summary: { intro: "From profile variant." } },
      { summary: { intro: "From role." } },
      { summary: { intro: "From application." } }
    );

    expect(result.summary.intro).toBe("From application.");
  });

  it("ignores undefined values in an override", () => {
    const result = mergeResume(baseResume, {
      summary: { intro: undefined },
    });

    expect(result.summary.intro).toBe("Base intro.");
  });

  it("does not mutate the base resume or prior layers", () => {
    const originalWorkHistory = baseResume.workHistory;
    mergeResume(baseResume, { workHistory: [] });

    expect(baseResume.workHistory).toBe(originalWorkHistory);
  });
});
