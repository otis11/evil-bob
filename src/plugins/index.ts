import type { FunctionComponent, JSX } from "react";

export function definePlugin(definition: PluginDefinition) {
	return definition;
}

export function extendedCommand(command: PluginCommand, plugin: Plugin) {
	return {
		...command,
		plugin: {
			id: plugin.id,
			title: plugin.definition.title,
			icon: plugin.definition.icon,
		},
	};
}

export function searchInPlugin(value: string, plugin: Plugin) {
	return (
		plugin.id.includes(value.toLowerCase()) ||
		plugin.definition.title.toLowerCase().includes(value.toLowerCase()) ||
		plugin.definition.description
			?.toLowerCase()
			.includes(value.toLowerCase())
	);
}

export function searchInPluginCommand(value: string, command: PluginCommand) {
	return (
		command.title.toLowerCase().includes(value.toLowerCase()) ||
		command.description?.toLowerCase().includes(value.toLowerCase())
	);
}

export function searchForPluginCommands(search: string, plugins: Plugin[]) {
	return plugins.flatMap((plugin) => {
		const foundCommands =
			plugin.definition.commands?.filter((command) => {
				return searchInPluginCommand(search, command);
			}) || [];
		return foundCommands.map((foundCommand) =>
			extendedCommand(foundCommand, plugin),
		);
	});
}

export interface PluginCommand {
	title: string;
	type: "command" | "view";
	name: string;
	description?: string;
}

export interface PluginCommandExtended extends PluginCommand {
	plugin: {
		id: string;
		title: string;
		icon?: JSX.Element;
	};
}

export interface Plugin {
	id: string;
	definition: PluginDefinition;
}

export interface PluginDefinition {
	commands?: PluginCommand[];
	permissions?: chrome.runtime.ManifestPermissions[];
	hostPermissions?: string[];
	icon?: JSX.Element;
	title: string;
	description?: string;
	searchEverywhereName?: "everywhere";
}

export interface SearchItem {
	content: JSX.Element;
	search: string;
}

export interface PluginCommandImported {
	Command: FunctionComponent | (() => Promise<void>);
	AdditionalSearchItems?: () => Promise<SearchItem[]>;
}
