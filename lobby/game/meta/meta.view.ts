namespace $.$$ {
	type Player_state = {
		key: string
		name: string
		status: 'correct' | 'wrong' | 'none'
	}

	export class $bog_blitz_lobby_game_meta extends $.$bog_blitz_lobby_game_meta {

		@$mol_mem
		player_states(): Player_state[] {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return []
			const key = this.current_answer_key() as { type: string; correct: string } | null
			const index = this.current_question_index()
			const keys = dict.keys() ?? []
			const list: Player_state[] = []
			for (const k of keys) {
				if ($bog_blitz_session_fields.has(String(k))) continue
				const player = dict.dive(k, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue
				const lord = String(k)
				const name = player.Name()?.val() ?? lord.slice(0, 8)
				const link = player.Answer_land()?.val()
				let status: Player_state['status'] = 'none'
				if (link) {
					const pa = this.$.$giper_baza_glob.Land(new $giper_baza_link(link)).Data($bog_blitz_player_answers) as $bog_blitz_player_answers | null
					const pa_q = pa?.Answer_question()?.val() ?? -1
					const answered = pa_q === index
					const answer = answered ? (pa?.Answer()?.val() ?? '') : ''
					if (answered && answer !== '') {
						status = this.is_correct(answer, key) ? 'correct' : 'wrong'
					}
				}
				list.push({ key: lord, name, status })
			}
			return list
		}

		is_correct(answer: string, key: { type: string; correct: string } | null) {
			if (!key) return false
			if (key.type === 'text_input') {
				const variants = key.correct.split(',').map(v => v.trim().toLowerCase())
				return variants.includes(answer.trim().toLowerCase())
			}
			const correct_set = new Set(key.correct.split(',').filter(Boolean))
			const answer_set = new Set(answer.split(',').filter(Boolean))
			return correct_set.size === answer_set.size &&
				[...correct_set].every(k => answer_set.has(k))
		}

		@$mol_mem
		total_players() {
			return this.player_states().length
		}

		@$mol_mem
		answered_count() {
			return this.player_states().filter(p => p.status !== 'none').length
		}

		@$mol_mem
		correct_count() {
			return this.player_states().filter(p => p.status === 'correct').length
		}

		@$mol_mem
		stats_answered_text() {
			return `${this.answered_count()} / ${this.total_players()} answered`
		}

		@$mol_mem
		stats_correct_text() {
			return `${this.correct_count()} correct`
		}

		@$mol_mem
		stats_percent_text() {
			const answered = this.answered_count()
			if (!answered) return '—'
			const pct = Math.round((this.correct_count() / answered) * 100)
			return `${pct}%`
		}

		@$mol_mem
		player_rows() {
			return this.player_states().map(p => this.Player_row(p.key))
		}

		@$mol_mem_key
		player_status(key: string) {
			const p = this.player_states().find(s => s.key === key)
			return p?.status ?? 'none'
		}

		@$mol_mem_key
		player_name(key: string) {
			const p = this.player_states().find(s => s.key === key)
			return p?.name ?? ''
		}
	}
}
