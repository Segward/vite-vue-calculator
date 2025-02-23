import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Contact from "../components/Contact.vue";
import store from "../Store";

describe("Contact.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Contact, {
      global: {
        plugins: [store],
      },
    });
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

  it("should alert when form is submitted successfully", async () => {
    const randomNumber = Math.floor(Math.random() * 100000000) + 1;
    const email = `john.doe${randomNumber}@example.com`;
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    await wrapper.find("#name").setValue("John Doe");
    await wrapper.find("#email").setValue(email);
    await wrapper.find("#message").setValue("This is a test message.");
    await wrapper.find("form").trigger("submit.prevent");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(alertSpy).toHaveBeenCalledWith("Form submitted successfully!");
    alertSpy.mockRestore();
  });
});
