namespace $.$$ {
	export class $bog_blitz_lobby_game_leaderboard extends $.$bog_blitz_lobby_game_leaderboard {
		@$mol_mem
		board_content() {
			const parts: ReturnType<typeof this.Top>[] = []
			if (this.my_row_content().length) parts.push(this.My_row())
			parts.push(this.Top())
			if (this.bottom_rows().length) parts.push(this.Bottom())
			return parts
		}

		@$mol_mem
		sorted_players() {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return []
			const keys = dict.keys() ?? []
			const players: { key: string; name: string; score: number }[] = []
			for (const key of keys) {
				if ($bog_blitz_session_fields.has(String(key))) continue
				const player = dict.dive(key, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue
				const answered = player.Answered_count()?.val() ?? 0
				const score = player.Score()?.val() ?? 0
				// Dropping players who skipped ALL questions (never answered).
				// Fallback: if Answered_count isn't populated yet but Score is non-zero,
				// treat as answered — keeps existing sessions intact.
				if (answered <= 0 && score === 0) continue
				players.push({
					key: String(key),
					name: player.Name()?.val() ?? String(key).slice(0, 8),
					score,
				})
			}
			return players.sort((a, b) => b.score - a.score)
		}

		@$mol_mem
		my_rank() {
			const lord = this.my_lord_str()
			const sorted = this.sorted_players()
			const index = sorted.findIndex(p => p.key === lord)
			return index >= 0 ? index + 1 : 0
		}

		@$mol_mem
		my_row_content() {
			if (this.is_host()) return []
			const lord = this.my_lord_str()
			const sorted = this.sorted_players()
			const me = sorted.find(p => p.key === lord)
			if (!me) return []
			return [this.Row(`my_${lord}`)]
		}

		@$mol_mem
		top_rows() {
			const sorted = this.sorted_players()
			return sorted.map((_, i) => this.Row(`top_${i}`))
		}

		@$mol_mem
		bottom_rows() {
			if (!this.final()) return []
			const sorted = this.sorted_players()
			if (sorted.length <= 3) return []
			const count = Math.min(3, sorted.length)
			return sorted.slice(-count).reverse().map((_, i) => this.Row(`bottom_${i}`))
		}

		@$mol_mem_key
		row_rank(key: string) {
			const [type, index] = key.split('_')
			if (type === 'my') return this.my_rank()
			if (type === 'top') return Number(index) + 1
			if (type === 'bottom') {
				const sorted = this.sorted_players()
				return sorted.length - Number(index)
			}
			return 0
		}

		@$mol_mem_key
		row_name(key: string) {
			const player = this.player_by_row_key(key)
			return player?.name ?? ''
		}

		@$mol_mem_key
		row_score(key: string) {
			const player = this.player_by_row_key(key)
			return player?.score ?? 0
		}

		@$mol_mem_key
		row_mine(key: string) {
			const player = this.player_by_row_key(key)
			return player?.key === this.my_lord_str()
		}

		player_by_row_key(key: string) {
			const [type, index] = key.split('_')
			const sorted = this.sorted_players()
			if (type === 'my') {
				const lord = this.my_lord_str()
				return sorted.find(p => p.key === lord) ?? null
			}
			if (type === 'top') return sorted[Number(index)] ?? null
			if (type === 'bottom') {
				return sorted[sorted.length - 1 - Number(index)] ?? null
			}
			return null
		}
	}
}
