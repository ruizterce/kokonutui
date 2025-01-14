import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
// import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            {...baseOptions}
            sidebar={{
                defaultOpenLevel: 1,
            }}
        >
            {children}
        </DocsLayout>
    );
}
