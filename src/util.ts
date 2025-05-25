import { FormState } from "./dagFormReducer";

export function getUpstreamForms(formId: string, forms: Record<string, FormState>): Set<string> {
    const visited = new Set<string>();
    const stack = [...(forms[formId]?.prerequisites || [])];

    while (stack.length) {
        const current = stack.pop();
        if (!current || visited.has(current)) continue;
        visited.add(current);
        const prereqs = forms[current]?.prerequisites || [];
        stack.push(...prereqs);
    }
    return visited;
}