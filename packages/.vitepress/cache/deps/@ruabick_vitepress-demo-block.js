import {
  computed,
  createBaseVNode,
  createBlock,
  createElementBlock,
  createVNode,
  defineComponent,
  mergeProps,
  normalizeClass,
  openBlock,
  reactive,
  ref,
  renderSlot,
  resolveComponent,
  toDisplayString,
  toRefs,
  unref,
  vShow,
  withCtx,
  withDirectives
} from "./chunk-FTNFVJB3.js";

// node_modules/.pnpm/registry.npmmirror.com+@ruabick+vitepress-demo-block@0.3.3/node_modules/@ruabick/vitepress-demo-block/dist/vitepress-demo-block.js
var w = (e, o) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of o)
    s[l] = n;
  return s;
};
var T = {};
var D = {
  t: "1596458734865",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "4898",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "14",
  height: "14"
};
var E = createBaseVNode("path", {
  d: "M68.608 962.56V206.848h740.864V962.56H68.608zM746.496 271.36H131.584v629.248h614.912V271.36zM131.584 262.144",
  "p-id": "4899",
  fill: "#666"
}, null, -1);
var H = createBaseVNode("path", {
  d: "M219.136 65.024v116.224h62.976V129.536h614.912v629.248h-60.416v61.952h123.392V65.024z",
  "p-id": "4900",
  fill: "#666"
}, null, -1);
var O = [
  E,
  H
];
function U(e, o) {
  return openBlock(), createElementBlock("svg", D, O);
}
var b = w(T, [["render", U]]);
var N = {};
var R = {
  t: "1596458647160",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "2840",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  width: "18",
  height: "18"
};
var I = createBaseVNode("path", {
  d: "M311.1 739c-6.1 0-12.2-2.3-16.8-7L69.7 507.4l224.6-224.6c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-191 191 191 191c9.3 9.3 9.3 24.3 0 33.6-4.6 4.7-10.7 7-16.8 7zM711.5 739c-6.1 0-12.2-2.3-16.8-7-9.3-9.3-9.3-24.3 0-33.6l191-191-191-191c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L953 507.4 728.3 732c-4.6 4.7-10.7 7-16.8 7zM418.5 814.7c-2.4 0-4.8-0.4-7.2-1.1-12.5-4-19.4-17.3-15.5-29.8l179.6-567.1c4-12.5 17.3-19.4 29.8-15.5 12.5 4 19.4 17.3 15.5 29.8L441.1 798.1a23.73 23.73 0 0 1-22.6 16.6z",
  fill: "#666",
  "p-id": "2841"
}, null, -1);
var J = [
  I
];
function P(e, o) {
  return openBlock(), createElementBlock("svg", R, J);
}
var j = w(N, [["render", P]]);
var F = ["href"];
var A = createBaseVNode("div", { style: { width: "16px", "margin-left": "6px" } }, [
  createBaseVNode("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 1024 1024",
    "xml:space": "preserve"
  }, [
    createBaseVNode("g", null, [
      createBaseVNode("path", {
        d: "M1004.57 319.408l-468-312c-15.974-9.83-33.022-9.92-49.142 0l-468 312C7.428 327.406 0 341.694 0 355.978v311.998c0 14.286 7.428 28.572 19.43 36.572l468 312.044c15.974 9.83 33.022 9.92 49.142 0l468-312.044c12-7.998 19.43-22.286 19.43-36.572V355.978c-0.002-14.284-7.43-28.572-19.432-36.57zM556 126.262l344.572 229.716-153.714 102.858L556 331.406V126.262z m-88 0v205.144l-190.858 127.43-153.714-102.858L468 126.262zM88 438.264l110.286 73.714L88 585.692v-147.428z m380 459.43L123.428 667.978l153.714-102.858L468 692.55v205.144z m44-281.716l-155.43-104 155.43-104 155.43 104-155.43 104z m44 281.716V692.55l190.858-127.43 153.714 102.858L556 897.694z m380-312.002l-110.286-73.714L936 438.264v147.428z",
        "p-id": "2793",
        fill: "#555"
      })
    ])
  ])
], -1);
var q = [
  A
];
var G = defineComponent({
  __name: "SfcPlayground",
  props: {
    content: null,
    importMap: null
  },
  setup(e) {
    const o = e, s = "https://sfc.vuejs.org/", l = computed(() => {
      const n = {
        "App.vue": o.content
      };
      if (o.importMap)
        try {
          n["import-map.json"] = JSON.stringify({
            imports: o.importMap
          });
        } catch {
        }
      return `${s}#${btoa(
        unescape(encodeURIComponent(JSON.stringify(n)))
      )}`;
    });
    return (n, u) => (openBlock(), createElementBlock("a", {
      href: unref(l),
      style: { display: "flex", "align-items": "center" },
      target: "_blank"
    }, q, 8, F));
  }
});
function K(e) {
  const o = reactive({
    showTip: false
  });
  function s() {
    navigator.clipboard.writeText(e), o.showTip = true, setTimeout(() => {
      o.showTip = false;
    }, 5 * 1e3);
  }
  return {
    ...toRefs(o),
    copyCode: s
  };
}
var Q = { class: "demo-slot vp-raw" };
var W = { class: "demo-title-desc" };
var X = { class: "demo-title" };
var Y = { class: "demo-desc" };
var Z = { class: "demo-actions" };
var tt = { class: "demo-platforms" };
var et = { class: "demo-buttons" };
var ot = { class: "demo-actions-copy" };
var st = { class: "demo-actions-tip" };
var nt = ["innerHTML"];
var it = defineComponent({
  __name: "Demo",
  props: {
    code: null,
    highlightedCode: null,
    title: null,
    desc: null,
    lang: { default: "vue" },
    defaultExpand: { type: Boolean, default: false },
    importMap: { default: () => ({}) }
  },
  setup(e) {
    const o = e, s = computed(() => decodeURIComponent(o.code)), { showTip: l, copyCode: n } = K(s.value), u = computed(
      () => decodeURIComponent(o.highlightedCode)
    ), r = ref(o.defaultExpand), x = () => r.value = !r.value;
    return (m, v) => {
      const y = resolveComponent("ClientOnly");
      return openBlock(), createBlock(y, null, {
        default: withCtx(() => [
          createBaseVNode("article", mergeProps(m.$attrs, { class: "vitepress-demo" }), [
            createBaseVNode("div", Q, [
              renderSlot(m.$slots, "default")
            ]),
            withDirectives(createBaseVNode("div", W, [
              createBaseVNode("span", X, toDisplayString(e.title), 1),
              createBaseVNode("span", Y, toDisplayString(e.desc), 1)
            ], 512), [
              [vShow, e.title || e.desc]
            ]),
            createBaseVNode("div", Z, [
              createBaseVNode("div", tt, [
                createVNode(G, {
                  content: unref(s),
                  importMap: e.importMap
                }, null, 8, ["content", "importMap"])
              ]),
              createBaseVNode("div", et, [
                createBaseVNode("div", ot, [
                  withDirectives(createBaseVNode("span", st, "复制成功!", 512), [
                    [vShow, unref(l)]
                  ]),
                  withDirectives(createVNode(b, {
                    onClick: unref(n),
                    title: "复制"
                  }, null, 8, ["onClick"]), [
                    [vShow, !unref(l)]
                  ])
                ]),
                createVNode(j, {
                  class: "demo-actions-expand",
                  onClick: v[0] || (v[0] = (lt) => x()),
                  title: "展开"
                })
              ])
            ]),
            withDirectives(createBaseVNode("div", {
              innerHTML: unref(u),
              class: normalizeClass(`language-${e.lang} extra-class`)
            }, null, 10, nt), [
              [vShow, r.value]
            ])
          ], 16)
        ]),
        _: 3
      });
    };
  }
});
export {
  it as default
};
//# sourceMappingURL=@ruabick_vitepress-demo-block.js.map
