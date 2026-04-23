import { computed, defineComponent, ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import NavTree from "../components/NavTree";
import Breadcrumbs from "../components/Breadcrumbs";
import { flattenNav, modules } from "../data/modules";

/**
 * 模块页通用布局。
 */
export default defineComponent({
	name: "ModuleLayout",
	setup() {
		const route = useRoute();
		const router = useRouter();
		const collapsed = ref(false);

		const moduleKey = computed(() => (route.meta.moduleKey as string) || "");
		const currentModule = computed(() => modules.find((item) => item.key === moduleKey.value) || null);

		const flatNodes = computed(() => (currentModule.value ? flattenNav(currentModule.value.navTree) : []));

		const activeNode = computed(() => flatNodes.value.find((node) => node.route === route.path) || null);

		const breadcrumbItems = computed(() => {
			if (!currentModule.value) return [];
			const list = [currentModule.value.title];
			if (activeNode.value) list.push(activeNode.value.title);
			return list;
		});

		const onSelect = (node: { route: string }) => {
			router.push(node.route);
		};

		const onToggle = () => {
			collapsed.value = !collapsed.value;
		};

		const goHome = () => {
			router.push("/");
		};

		return () => (
			<div class={["module-page", collapsed.value && "is-collapsed"].filter(Boolean)}>
				{currentModule.value && (
					<div class="module-nav-layer">
						{!collapsed.value && (
							<NavTree
								nodes={currentModule.value.navTree}
								activeRoute={route.path}
								onSelect={onSelect}
								collapsed={false}
								showToggle={false}
							/>
						)}
					</div>
				)}
				<button class="module-home-btn" type="button" onClick={goHome} aria-label="home">
					<span class="module-home-icon" />
				</button>
				<button class="module-mode-btn" type="button" onClick={onToggle} aria-label="toggle">
					<span class="module-mode-icon" />
				</button>
				{collapsed.value && (
					<div class="module-header">
						<Breadcrumbs items={breadcrumbItems.value} />
					</div>
				)}
				<div class="module-view">
					<RouterView />
				</div>
			</div>
		);
	},
});
