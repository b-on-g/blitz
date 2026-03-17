namespace $.$$ {

	const reaction_keys = ['heart', 'smile', 'fire', 'clap', 'poop'] as const
	const reaction_emojis: Record<string, string> = {
		heart: '❤️',
		smile: '😊',
		fire: '🔥',
		clap: '👏',
		poop: '💩',
	}
	const reaction_fields: Record<string, 'React_heart' | 'React_smile' | 'React_fire' | 'React_clap' | 'React_poop'> = {
		heart: 'React_heart',
		smile: 'React_smile',
		fire: 'React_fire',
		clap: 'React_clap',
		poop: 'React_poop',
	}

	export class $bog_blitz_lobby_reactions extends $.$bog_blitz_lobby_reactions {

		react(key: string) {
			const player = this.my_player() as $bog_blitz_player | null
			if (!player) return
			const field = reaction_fields[key]
			if (!field) return
			const prev = player[field]()?.val() ?? 0
			player[field]('auto')?.val(prev + 1)
			this.spawn_fly(key)
		}

		@$mol_mem
		react_heart(next?: Event) { if (next !== undefined) this.react('heart') }
		@$mol_mem
		react_smile(next?: Event) { if (next !== undefined) this.react('smile') }
		@$mol_mem
		react_fire(next?: Event) { if (next !== undefined) this.react('fire') }
		@$mol_mem
		react_clap(next?: Event) { if (next !== undefined) this.react('clap') }
		@$mol_mem
		react_poop(next?: Event) { if (next !== undefined) this.react('poop') }

		total_count(key: string) {
			const dict = this.players_dict() as $giper_baza_dict | null
			if (!dict) return 0
			const keys = dict.keys() ?? []
			const field = reaction_fields[key]
			if (!field) return 0
			let total = 0
			for (const k of keys) {
				if ($bog_blitz_quiz_fields.has(String(k))) continue
				const player = dict.dive(k, $bog_blitz_player) as $bog_blitz_player | null
				if (!player) continue
				if (player.IsHost()?.val()) continue
				total += player[field]()?.val() ?? 0
			}
			return total
		}

		count_text(key: string) {
			if (!this.is_host()) return ''
			const count = this.total_count(key)
			return count ? String(count) : ''
		}

		@$mol_mem
		count_heart_text() { return this.count_text('heart') }
		@$mol_mem
		count_smile_text() { return this.count_text('smile') }
		@$mol_mem
		count_fire_text() { return this.count_text('fire') }
		@$mol_mem
		count_clap_text() { return this.count_text('clap') }
		@$mol_mem
		count_poop_text() { return this.count_text('poop') }

		prev_totals: Record<string, number> = {}

		@$mol_mem
		watch_reactions() {
			if (!this.is_host()) return
			for (const key of reaction_keys) {
				const total = this.total_count(key)
				const prev = this.prev_totals[key] ?? 0
				if (total > prev && prev > 0) {
					const diff = total - prev
					for (let i = 0; i < Math.min(diff, 5); i++) {
						this.spawn_fly(key)
					}
				}
				this.prev_totals[key] = total
			}
		}

		override auto() {
			this.watch_reactions()
		}

		spawn_fly(key: string) {
			const emoji = reaction_emojis[key]
			if (!emoji) return
			const btn_map: Record<string, () => $mol_view> = {
				heart: () => this.Btn_heart(),
				smile: () => this.Btn_smile(),
				fire: () => this.Btn_fire(),
				clap: () => this.Btn_clap(),
				poop: () => this.Btn_poop(),
			}
			const container = this.dom_node() as HTMLElement
			const btn = btn_map[key]?.().dom_node() as HTMLElement | undefined
			const fly = document.createElement('div')
			fly.textContent = emoji
			fly.setAttribute('bog_blitz_lobby_reactions_fly', '')
			if (btn) {
				const btnRect = btn.getBoundingClientRect()
				const containerRect = container.getBoundingClientRect()
				fly.style.left = `${btnRect.left - containerRect.left + btnRect.width / 2}px`
			} else {
				fly.style.left = '50%'
			}
			container.appendChild(fly)
			fly.addEventListener('animationend', () => fly.remove())
		}
	}
}
