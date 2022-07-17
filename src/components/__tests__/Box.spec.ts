// import { describe, it, expect } from "vitest";

// // import { mount } from "@vue/test-utils";
// import RollBox from "../RollBox.vue";

// describe("RollBox", () => {
//   it("renders properly", () => {
//     const wrapper = mount(RollBox, { props: { choice: "w" } });
//     expect(wrapper.text()).toContain("w");
//   });
// });



import { mount } from '@cypress/vue'
import RollBox from "../RollBox.vue";

describe('RollBox', () => {
  it('renders a message', () => {
    const choice = 'Hello Cypress Component Testing!'
    mount(RollBox, {
      propsData: {
        choice
      }
    })

    cy.get('h1').should('have.text', choice)
  })
})