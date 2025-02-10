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
    const calculatorButton = buttons[0];
    const contactButton = buttons[1];
    expect(calculatorButton.text()).toBe("Calculator");
    expect(contactButton.text()).toBe("Contact");
  });

  it("has correct links", () => {
    const links = wrapper.findAll("a");
    expect(links.length).toBe(2);
    const calculatorLink = links[0];
    const contactLink = links[1];
    expect(calculatorLink.attributes("href")).toBe("/");
    expect(contactLink.attributes("href")).toBe("/contact");
  });
});
