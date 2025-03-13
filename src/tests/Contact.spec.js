import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Contact from "../components/Contact.vue";

describe("Contact.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Contact);
  });

  it("renders contact form", () => {
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("#name").exists()).toBe(true);
    expect(wrapper.find("#email").exists()).toBe(true);
    expect(wrapper.find("#message").exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it("enabled submit button with valid contact form", async () => {
    await wrapper.find("#name").setValue("John Doe");
    await wrapper.find("#email").setValue("john.doe@example.com");
    await wrapper.find("#message").setValue("This is a test message.");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.element.disabled).toBe(false);
  });

  it("disabled submit button with invalid email", async () => {
    await wrapper.find("#name").setValue("John Doe");
    await wrapper.find("#email").setValue("john.doe.not-an-email");
    await wrapper.find("#message").setValue("This is a test message.");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.element.disabled).toBe(true);
  });

  it("disabled submit button with empty fields", async () => {
    await wrapper.find("#name").setValue("");
    await wrapper.find("#email").setValue("");
    await wrapper.find("#message").setValue("");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.element.disabled).toBe(true);
  });
});
