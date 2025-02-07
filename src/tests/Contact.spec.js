import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
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
  });

  it("submit successfull contact form", async () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [store],
      },
    });
    wrapper.find("#name").setValue("John Doe");
    wrapper.find("#email").setValue("john.doe@example.com");
    wrapper.find("#message").setValue("This is a test message.");
    await wrapper.find("form").trigger("submit.prevent");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.element.disabled).toBe(false);
  });

  it("submit contact form with invalid email", async () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [store],
      },
    });
    wrapper.find("#name").setValue("John Doe");
    wrapper.find("#email").setValue("john.doe.not-an-email");
    wrapper.find("#message").setValue("This is a test message.");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.element.disabled).toBe(true);
  });

  it("submit contact form with empty fields", async () => {
    const wrapper = mount(Contact, {
      global: {
        plugins: [store],
      },
    });
    wrapper.find("#name").setValue("");
    wrapper.find("#email").setValue("");
    wrapper.find("#message").setValue("");
    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.element.disabled).toBe(true);
  });
});
