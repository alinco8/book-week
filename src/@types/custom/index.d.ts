declare namespace SocketEvents {
    interface Client2Server {
        change(key: string, value: number): void;
        init(): void;
    }
    interface Server2Client {
        all(db: Record<string, number>): void;
        changed(key: string, value: number): void;
    }
    interface Server {
        ping(): void;
    }
}
