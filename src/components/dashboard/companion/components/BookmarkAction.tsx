"use client";
import { Button } from "@/components/ui/button";
import { CompanionCard } from "@/types/companion";
import axios from "axios";
import { Bookmark, Loader2, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const BookmarkAction = ({ card }: { card: CompanionCard }) => {
    const [bookmarked, setBookmarked] = useState<boolean | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const handleCheckBookmarkStatus = async () => {
            try {
                setBookmarked(null);

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE}/api/companion/bookmarks`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    const exists = response.data.saved_cards?.some(
                        (item: { query: string; type: string }) =>
                            item.query === card.name &&
                            item.type === card.type
                    );

                    setBookmarked(exists);
                }
            } catch (error) {
                console.error(error);
                setBookmarked(false);
            }
        };

        handleCheckBookmarkStatus();
    }, [card.name, card.type]);

    const handleBookmark = async () => {
        try {
            setSaving(true);

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/companion/bookmarks`,
                {
                    query: card.name,
                    type: card.type,
                    card,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setBookmarked(true);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (bookmarked === null) {
        return (
            <Button size="lg" disabled>
                <Loader2 className="animate-spin" />
                Checking...
            </Button>
        );
    }

    if (bookmarked) {
        return (
            <Button size="lg" className="bg-red-500/80 hover:bg-red-500/90 duration-150">
                <Trash />
                Delete
            </Button>
        );
    }

    return (
        <Button
            onClick={handleBookmark}
            size="lg"
            disabled={saving}
        >
            {saving ? (
                <>
                    <Loader2 className="animate-spin" />
                    Saving...
                </>
            ) : (
                <>
                    <Bookmark />
                    Save
                </>
            )}
        </Button>
    );
};

export default BookmarkAction;