import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Navigator from "../app/presentation/components/navigator.vue";
import UsersList from "../app/presentation/pages/users-list.vue";
import CreateUser from "../app/presentation/pages/create-user.vue";

// 1. Mock the router and its routes
const routes = [
  { path: "/", name: "View USERS", component: UsersList },
  { path: "/create-user", name: "New user", component: CreateUser },
];

const mockedRouter = createRouter({
  history: createWebHistory(),
  routes,
});

// 2. Mock the $router.getRoutes() method
const mockGetRoutes = vi.fn(() => routes);

// 3. Describe the test suite for the Navigator component
describe("Navigator.vue", () => {
  // Test case for initial render on the home page
  it("renders the first two routes and applies active class to the home route", async () => {
    // Mock the current route to be the home page ('/')
    mockedRouter.currentRoute.value = {
      ...mockedRouter.currentRoute.value,
      fullPath: "/",
      path: "/",
    };

    // Mount the component with the mocked router
    const wrapper = mount(Navigator, {
      global: {
        plugins: [mockedRouter],
        mocks: {
          $router: {
            getRoutes: mockGetRoutes,
          },
        },
      },
    });

    // Wait for the component to render
    await wrapper.vm.$nextTick();

    // Assert that there are exactly two navigation items
    const menuItems = wrapper.findAll(".menu-item");
    expect(menuItems.length).toBe(2);

    // Assert that the first link is "View USERS" and has the active class
    const firstLink = menuItems[0].find("a");
    expect(firstLink.text()).toBe("View USERS");
    expect(menuItems[0].classes()).toContain("active-item");
    expect(menuItems[0].classes()).not.toContain("none-active-item");

    // Assert that the second link is "New user" and does not have the active class
    const secondLink = menuItems[1].find("a");
    expect(secondLink.text()).toBe("New user");
    expect(menuItems[1].classes()).toContain("none-active-item");
    expect(menuItems[1].classes()).not.toContain("active-item");
  });

  // Test case for rendering on the 'New user' page
  it('applies the active class to the "New user" route', async () => {
    // Mock the current route to be the '/create-user' page
    mockedRouter.currentRoute.value = {
      ...mockedRouter.currentRoute.value,
      fullPath: "/create-user",
      path: "/create-user",
    };

    // Mount the component again with the updated mock
    const wrapper = mount(Navigator, {
      global: {
        plugins: [mockedRouter],
        mocks: {
          $router: {
            getRoutes: mockGetRoutes,
          },
        },
      },
    });

    // Wait for the component to re-render
    await wrapper.vm.$nextTick();

    // Assert that the second link now has the active class
    const menuItems = wrapper.findAll(".menu-item");
    expect(menuItems.length).toBe(2);

    const firstItem = menuItems[0];
    const secondItem = menuItems[1];

    expect(firstItem.classes()).toContain("none-active-item");
    expect(secondItem.classes()).toContain("active-item");
  });
});
