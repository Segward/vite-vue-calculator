import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Calculator from "../components/Calculator.vue";

describe("Calculator.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Calculator);
  });

  it("renders calculator buttons", () => {
    const buttons = wrapper.findAll(".btn, .btn-op");
    expect(buttons.length).toBe(20);
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

  it("clears the display", async () => {
    const buttons = wrapper.findAll(".btn");
    const clearButton = buttons[0];
    const button1 = buttons[3];
    await button1.trigger("click");
    await clearButton.trigger("click");
    expect(wrapper.find(".display").text()).toBe("0");
  });

  it("pressing equals button calls calculate method", async () => {
    const operators = wrapper.findAll(".btn-op");
    const equalsSpy = vi.spyOn(wrapper.vm, "calculate");
    const equalsButton = operators[4];
    await equalsButton.trigger("click");
    expect(equalsSpy).toHaveBeenCalled();
  });

  it("pressing del button calls delete method", async () => {
    const buttons = wrapper.findAll(".btn");
    const delSpy = vi.spyOn(wrapper.vm, "del");
    const equalsButton = buttons[2];
    await equalsButton.trigger("click");
    expect(delSpy).toHaveBeenCalled();
  });

  it("pressing clear button calls clear method", async () => {
    const buttons = wrapper.findAll(".btn");
    const clearSpy = vi.spyOn(wrapper.vm, "clear");
    const equalsButton = buttons[0];
    await equalsButton.trigger("click");
    expect(clearSpy).toHaveBeenCalled();
  });

  it("pressing ans button calls ans method", async () => {
    const buttons = wrapper.findAll(".btn");
    const ansSpy = vi.spyOn(wrapper.vm, "ans");
    const equalsButton = buttons[1];
    await equalsButton.trigger("click");
    expect(ansSpy).toHaveBeenCalled();
  });

  it("test simple addition buttons", async () => {
    const buttons = wrapper.findAll(".btn");
    const button1 = buttons[3]; // 1
    const button2 = buttons[4]; // 2
    const button3 = buttons[5]; // 3
    const addition = wrapper.findAll(".btn-op")[0];
    await button1.trigger("click");
    await button2.trigger("click");
    await addition.trigger("click");
    await button3.trigger("click");
    expect(wrapper.find(".display").text()).toBe("12+3");
  });

  it("test simple subtraction buttons", async () => {
    const buttons = wrapper.findAll(".btn");
    const button1 = buttons[3]; // 1
    const button2 = buttons[4]; // 2
    const button3 = buttons[5]; // 3
    const subtraction = wrapper.findAll(".btn-op")[1];
    await button1.trigger("click");
    await button2.trigger("click");
    await subtraction.trigger("click");
    await button3.trigger("click");
    expect(wrapper.find(".display").text()).toBe("12-3");
  });

  it("test simple multiplication buttons", async () => {
    const buttons = wrapper.findAll(".btn");
    const button1 = buttons[3]; // 1
    const button2 = buttons[4]; // 2
    const button3 = buttons[5]; // 3
    const multiplication = wrapper.findAll(".btn-op")[2];
    await button1.trigger("click");
    await button2.trigger("click");
    await multiplication.trigger("click");
    await button3.trigger("click");
    expect(wrapper.find(".display").text()).toBe("12*3");
  });

  it("test simple division buttons", async () => {
    const buttons = wrapper.findAll(".btn");
    const button1 = buttons[3]; // 1
    const button2 = buttons[4]; // 2
    const button3 = buttons[5]; // 3
    const division = wrapper.findAll(".btn-op")[3];
    await button1.trigger("click");
    await button2.trigger("click");
    await division.trigger("click");
    await button3.trigger("click");
    expect(wrapper.find(".display").text()).toBe("12/3");
  });
});
