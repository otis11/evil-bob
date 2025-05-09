import { definePlugin } from "@/plugins/index.ts";
import { BookmarkIcon } from "lucide-react";

export default definePlugin({
	title: "Bookmarks",
	description: "Interact with bookmarks",
	permissions: ["bookmarks"],
	icon: <BookmarkIcon></BookmarkIcon>,
	commands: [
		{
			title: "Bookmark current tab",
			name: "bookmark-current-tab",
			type: "command",
		},
		{
			title: "Bookmarks",
			name: "bookmarks",
			type: "view",
		},
	],
});
