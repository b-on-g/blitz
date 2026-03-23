namespace $.$$ {

	const reaction_keys = ['heart', 'smile', 'fire', 'clap', 'poop'] as const
	const reaction_fields: Record<string, 'React_heart' | 'React_smile' | 'React_fire' | 'React_clap' | 'React_poop'> = {
		heart: 'React_heart',
		smile: 'React_smile',
		fire: 'React_fire',
		clap: 'React_clap',
		poop: 'React_poop',
	}

	export class $bog_blitz_lobby_game_reactboard extends $.$bog_blitz_lobby_game_reactboard {

		sorted_by(key: string) {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return []
			const keys = dict.keys() ?? []
			const field = reaction_fields[key]
			if (!field) return []
			const players: { name: string; count: number }[] = []
			for (const k of keys) {
				if ($bog_blitz_session_fields.has(String(k))) continue
				const player = dict.dive(k, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue
				const count = player[field]()?.val() ?? 0
				if (!count) continue
				players.push({
					name: player.Name()?.val() ?? String(k).slice(0, 8),
					count,
				})
			}
			return players.sort((a, b) => b.count - a.count).slice(0, 3)
		}

		make_rows(key: string) {
			return this.sorted_by(key).map((_, i) => this.Row(`${key}_${i}`))
		}

		@$mol_mem
		rows_heart() { return this.make_rows('heart') }
		@$mol_mem
		rows_smile() { return this.make_rows('smile') }
		@$mol_mem
		rows_fire() { return this.make_rows('fire') }
		@$mol_mem
		rows_clap() { return this.make_rows('clap') }
		@$mol_mem
		rows_poop() { return this.make_rows('poop') }

		@$mol_mem_key
		row_name(id: string) {
			const [key, index] = id.split('_')
			const sorted = this.sorted_by(key)
			return sorted[Number(index)]?.name ?? ''
		}

		@$mol_mem_key
		row_count(id: string) {
			const [key, index] = id.split('_')
			const sorted = this.sorted_by(key)
			const count = sorted[Number(index)]?.count ?? 0
			return count ? String(count) : ''
		}
	}
}
