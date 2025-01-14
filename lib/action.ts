// import path from "path";
// import { promises as fs } from "fs";

// export async function getComponent(fileName: string, folder: string) {
//     const prePath = path.join(process.cwd(), "components", folder);

//     const file = await fs.readFile(path.join(prePath, fileName), "utf-8");

//     return file;
// }

// export async function getHook(fileName: string) {
//     const prePath = path.join(process.cwd(), "hooks");

//     const file = await fs.readFile(path.join(prePath, fileName), "utf-8");

//     return file;
// }

// export async function getBlockExample(fileName: string) {
//     const prePath = path.join(process.cwd(), "components", "ui");

//     const file = await fs.readFile(path.join(prePath, fileName), "utf-8");

//     return file;
// }


"use server";

import { headers } from "next/headers";
import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";

// Create a cached version of the file reading operation
const readFileCache = cache(async (filePath: string) => {
    return await fs.readFile(filePath, "utf-8");
});

// Improve caching for the entire component getter
export const getComponent = async (fileName: string, folder: string) => {

    const baseDir = path.join(process.cwd(), "components/kokonutui");
    const fullPath = path.join(baseDir, folder, `${fileName}.tsx`);

    return await readFileCache(fullPath);
};

export type CopyComponentState = {
    error: string;
    content: string;
    success: boolean;
};

export const copyComponent = async (
    prevState: CopyComponentState,
    formData: FormData
) => {
    try {
        const folder = formData.get("folder");
        const fileName = formData.get("fileName");

        if (!folder || !fileName) {
            return {
                error: "Folder or file name not found",
                content: "",
                success: false,
            };
        }

        const content = await getComponent(
            fileName as string,
            folder as string
        );

        if (!content) {
            return {
                error: "Component not found",
                content: "",
                success: false,
            };
        }

        return {
            error: "",
            content: content,
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to copy component",
            content: "",
            success: false,
        };
    }
};
