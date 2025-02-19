import { Command as CommandPrimitive } from "cmdk-sv";
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const CommandItem: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<CommandPrimitive.ItemProps, {
    default: {
        action: (node: HTMLElement) => {
            destroy(): void;
        };
        attrs: {
            'aria-disabled': boolean | undefined;
            'aria-selected': boolean | undefined;
            'data-disabled': boolean | undefined;
            'data-selected': boolean | undefined;
            'data-cmdk-item': string;
            'data-value': string;
            role: string;
            id: string;
        };
    };
}>, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        action: (node: HTMLElement) => {
            destroy(): void;
        };
        attrs: {
            'aria-disabled': boolean | undefined;
            'aria-selected': boolean | undefined;
            'data-disabled': boolean | undefined;
            'data-selected': boolean | undefined;
            'data-cmdk-item': string;
            'data-value': string;
            role: string;
            id: string;
        };
    };
}, {}, string>;
type CommandItem = InstanceType<typeof CommandItem>;
export default CommandItem;
