import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import Navigator from "../components/Navigator.vue";

describe("Navigator.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navigator);
  });

  it("renders navigation buttons", () => {
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe("Calculator");
    expect(buttons[1].text()).toBe("Contact");
  });

  it("has correct links", () => {
    const links = wrapper.findAll("a");
    expect(links[0].attributes("href")).toBe("/");
    expect(links[1].attributes("href")).toBe("/contact");
  });
});
