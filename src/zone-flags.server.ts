const serverZoneFlags = globalThis as typeof globalThis & {
	__Zone_disable_EventTarget?: boolean;
};

serverZoneFlags.__Zone_disable_EventTarget = true;