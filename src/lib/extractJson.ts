export function extractJson<T = unknown>(content: string): T {
    try {
        return JSON.parse(content) as T;
    } catch {
        // Match object OR array JSON
        const match = content.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);

        if (match) {
            try {
                return JSON.parse(match[0]) as T;
            } catch (err) {
                console.error("Extracted JSON still invalid:", err);
            }
        }

        throw new Error("No valid JSON found in AI response");
    }
}