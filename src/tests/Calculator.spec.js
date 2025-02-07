import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Calculator from "../components/Calculator.vue";

describe("Calculator.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Calculator);
  });

  it("renders calculator buttons", () => {
    const buttons = wrapper.findAll(".btn, .btn-op");
    expect(buttons.length).toBe(19);
  });

  it("displays initial value of 0", () => {
    const display = wrapper.find(".display");
    expect(display.text()).toBe("0");
  });

  it("appends numbers to the display", async () => {
    const buttons1 = wrapper.findAll(".btn")[3];
    await buttons1.trigger("click");
    expect(wrapper.find(".display").text()).toBe("1");
  });

  it("performs addition correctly", async () => {
    const buttons = wrapper.findAll(".btn");
    const operators = wrapper.findAll(".btn-op");
    const button1 = buttons[3];
    const button2 = buttons[4];
    const addButton = operators[0];
    const equalsButton = operators[4];
    await button1.trigger("click");
    await addButton.trigger("click");
    await button2.trigger("click");
    await equalsButton.trigger("click");
    expect(wrapper.find(".display").text()).toBe("3");
  });
});
