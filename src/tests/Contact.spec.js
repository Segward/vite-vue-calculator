import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Contact from "../components/Contact.vue";
import store from "../Store";
vi.mock("axios");

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

  it("should display alert when form is submitted", async () => {
    const randomNumber = Math.floor(Math.random() * 100000000) + 1;
    const email = `john.doe${randomNumber}@example.com`;
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.find("#name").setValue("John Doe");
    wrapper.find("#email").setValue(email);
    wrapper.find("#message").setValue("This is a test message.");
    await wrapper.find("form").trigger("submit.prevent");
    expect(alertSpy).toHaveBeenCalledWith("Form submitted successfully!");
    try {
      const response = await axios.get("http://localhost:3000/users");
      expect(response.status).toBe(200);
      const user = response.data.find((user) => user.email === email);
      expect(user).toBeTruthy();
      expect(user.name).toBe("John Doe");
      expect(user.message).toBe("This is a test message.");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    alertSpy.mockRestore();
  });
});