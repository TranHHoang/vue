import { computePosition, ReferenceElement, shift } from "@floating-ui/vue";
import { Editor } from "@tiptap/core";
import { StarterKit, StarterKitOptions } from "@tiptap/starter-kit";
import {
  Suggestion,
  SuggestionOptions,
  SuggestionProps,
} from "@tiptap/suggestion";
import { Extension, Range, VueRenderer } from "@tiptap/vue-3";
import { starterkitDefaultOptions } from "~/entities/editor-area";
import { useInsertBlockMenuStore } from "../model/menuStore";
import InsertBlockMenu from "../ui/InsertBlockMenu.vue";

export interface MenuItem {
  title: string;
  description: string;
  onCommand: (props: MenuItemProps) => void;
}

interface MenuItemProps {
  editor: Editor;
  range: Range;
}

type SlashMenuOptions = Omit<SuggestionOptions<MenuItem>, "editor"> & {
  element: HTMLElement | null;
};

type Func = (...args: unknown[]) => unknown;

type RetType<T extends Func | undefined> = T extends Func
  ? ReturnType<T>
  : never;

function onChange(el: Element, props: SuggestionProps<MenuItem>) {
  if (!(el instanceof HTMLElement)) return;

  const clientRect = props.clientRect?.();
  if (!clientRect) return;

  const refEl: ReferenceElement = {
    getBoundingClientRect() {
      return clientRect;
    },
  };

  void computePosition(refEl, el, {
    middleware: [shift()],
  }).then(({ x, y }) => {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}

function render(): RetType<SuggestionOptions<MenuItem>["render"]> {
  let component: VueRenderer | null = null;

  return {
    onStart: (props) => {
      component = new VueRenderer(InsertBlockMenu, {
        props,
        editor: props.editor,
      });
      document.body.append(component.element);
      onChange(component.element, props);
    },
    onUpdate: (props) => {
      if (!component) return;

      component.updateProps(props);
      onChange(component.element, props);
    },
    onExit() {
      component?.destroy();
    },
  };
}

export const SlashMenu = Extension.create<SlashMenuOptions>({
  name: "slashMenu",

  addOptions() {
    return {
      element: null,
      char: "/",
      command: ({ editor, range, props }) => {
        props.onCommand({ editor, range });
      },
    };
  },

  addExtensions() {
    return [
      StarterKit.extend<StarterKitOptions>({
        name: "starterKitNode",
        addOptions() {
          return {
            ...starterkitDefaultOptions,
            heading: {},
            blockquote: {},
            bulletList: {},
            codeBlock: {},
            horizontalRule: {},
            listItem: {},
            orderedList: {},
          };
        },
      }),
    ];
  },

  addProseMirrorPlugins() {
    const menuStore = useInsertBlockMenuStore();
    return [
      Suggestion({
        ...this.options,
        editor: this.editor,
        items: ({ query }) => menuStore.search(query),
        render,
      }),
    ];
  },
});
