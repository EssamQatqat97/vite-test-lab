import { mount } from "@vue/test-utils";
import { createRouter, createWebHashHistory } from "vue-router";
import Navigator from "../app/presentation/components/navigator.vue";

// Mock pages
const UsersList = { template: "<div>Users List</div>" };
const CreateUser = { template: "<div>Create User</div>" };

const routes = [
  { path: "/", name: "View USERS", component: UsersList },
  { path: "/create-user", name: "New user", component: CreateUser },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

describe("Navigator.vue", () => {
  it("renders the first two routes from router", async () => {
    router.push("/"); // set active route
    await router.isReady();

    const wrapper = mount(Navigator, {
      global: {
        plugins: [router],
      },
    });

    // Find menu items
    const items = wrapper.findAll(".menu-item");
    expect(items.length).toBe(2); // only first 2 routes

    // Check route names
    expect(items[0].text()).toContain("View USERS");
    expect(items[1].text()).toContain("New user");

    // Check active/none-active classes
    expect(items[0].classes()).toContain("active-item");
    expect(items[1].classes()).toContain("none-active-item");
  });

  it("highlights correct menu item when route changes", async () => {
    router.push("/create-user");
    await router.isReady();

    const wrapper = mount(Navigator, {
      global: {
        plugins: [router],
      },
    });

    const items = wrapper.findAll(".menu-item");
    console.log("create user->", items[0].classes());
    console.log("create user->", items[1].classes());
    expect(items[0].classes()).not.toContain("none-active-item");
    expect(items[0].classes()).toContain("menu-item");
    expect(items[1].classes()).not.toContain("active-item");
  });
});
