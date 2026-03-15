namespace $.$$ {
	export class $bog_blitz_lobby_players extends $.$bog_blitz_lobby_players {
		@$mol_mem
		player_keys() {
			const dict = this.dict()
			if (!dict) return []
			return dict.keys() as string[]
		}

		@$mol_mem
		player_rows() {
			return this.player_keys().map(key => this.Player(key))
		}

		@$mol_mem_key
		player_name(key: string) {
			const entry = this.dict()?.key(key)
			return entry?.Name()?.val() ?? key.slice(0, 8)
		}
	}
}
