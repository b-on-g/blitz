namespace $.$$ {
	export class $bog_blitz_lobby_host extends $.$bog_blitz_lobby_host {
		@mol_mem
		counter_string() {
			const count = this.Players().player_views().length
			return `${this.players_string()}: ${count}`
		}
	}
}
