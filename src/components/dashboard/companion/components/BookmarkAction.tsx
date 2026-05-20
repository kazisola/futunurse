"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSaveCardMutation } from "@/redux/services/companionApi";
import { CompanionCard } from "@/types/companion";
import { Bookmark, Loader2 } from "lucide-react";

const BookmarkAction = ({ card }: { card: CompanionCard }) => {
    const [saveCard, { isLoading }] = useSaveCardMutation();
    const handleBookmark = async () => {
        try {
            await saveCard({ query: card.name, type: card.type, card })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button
            onClick={handleBookmark}
            size="lg"
            disabled={isLoading}
        >
            {isLoading ? (
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