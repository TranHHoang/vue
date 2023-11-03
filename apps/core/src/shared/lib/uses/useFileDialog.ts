import { Ref, ref } from "vue";
import { useFileSystemAccess } from "@vueuse/core";
import { dialog, fs } from "@tauri-apps/api";

type Awaitable<T> = T | Promise<T>;

interface OpenFileOptions {
  multiple?: boolean;
  types?: {
    description?: string;
    accept: Record<string, string[]>;
  }[];
}

export interface SaveFileOptions {
  suggestedName?: string;
  types?: {
    description?: string;
    accept: Record<string, string[]>;
  }[];
}

interface UseFileDialogReturn {
  fileName: Readonly<Ref<string | undefined>>;
  filePath: Readonly<Ref<string | undefined>>;
  data: Ref<string | undefined>;
  open: (options: OpenFileOptions) => Awaitable<void>;
  save: (options: SaveFileOptions) => Awaitable<void>;
}

export function useFileDialog(): UseFileDialogReturn {
  const dataRef = ref<string>();
  const filePathRef = ref<string>();
  const fileNameRef = ref<string>();

  async function tauriOpen(opts: OpenFileOptions) {
    const filePath = await dialog.open({
      multiple: false,
      filters: opts.types?.map((ty) => ({
        name: ty.description ?? "",
        extensions: Object.values(ty.accept)
          .flat()
          .map((v) => v.slice(1)),
      })),
    });
    if (filePath == null) return;

    if (typeof filePath === "string") {
      dataRef.value = await fs.readTextFile(filePath);
      filePathRef.value = filePath;
    }
  }

  async function tauriSave(options: SaveFileOptions) {
    if (!filePathRef.value) {
      const filePath = await dialog.save({
        filters: options.types?.map((ty) => ({
          name: ty.description ?? "",
          extensions: Object.values(ty.accept)
            .flat()
            .map((v) => v.slice(1)),
        })),
      });
      if (filePath) filePathRef.value = filePath;
    }
    if (!filePathRef.value) return;

    await fs.writeTextFile(filePathRef.value, dataRef.value ?? "");
  }

  const hasTauriAPI = Boolean(window.__TAURI__);
  if (hasTauriAPI) {
    return {
      fileName: fileNameRef,
      filePath: filePathRef,
      data: dataRef,
      open: tauriOpen,
      save: tauriSave,
    };
  }

  const { fileName, data, open, save } = useFileSystemAccess({
    dataType: "Text",
  });

  return {
    fileName,
    filePath: filePathRef,
    data,
    open,
    save,
  };
}
