namespace $.$$ {

	const personas = [
		{ min: 0, title: 'Новичок', desc: 'Вы только начали свой путь в квизах. Впереди много открытий!' },
		{ min: 3, title: 'Любопытный', desc: 'Вы уже распробовали вкус квизов. Теперь вас не остановить!' },
		{ min: 10, title: 'Знаток', desc: 'Ваши знания впечатляют. Соперники начинают вас бояться.' },
		{ min: 25, title: 'Гуру', desc: 'Легенда квизов! Ваше имя произносят с придыханием.' },
		{ min: 50, title: 'Грандмастер', desc: 'Вы — живая энциклопедия. Квиз — ваша стихия!' },
	]

	export class $bog_blitz_profile_page extends $.$bog_blitz_profile_page {

		profile_data() {
			const home = this.$.$giper_baza_glob.home()
			return home.land().Data($bog_blitz_profile)
		}

		@$mol_mem
		player_id() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		@$mol_mem
		profile_name(next?: string) {
			const profile = this.profile_data()
			if (next !== undefined) {
				profile.Name('auto')?.val(next)
				return next
			}
			return profile.Name()?.val() ?? ''
		}

		@$mol_mem
		avatar_uri() {
			// Show local preview immediately after upload
			const files = this.avatar_files()
			if (files.length) return URL.createObjectURL(files[0])

			const profile = this.profile_data()
			const file = profile.Avatar()?.remote()
			if (!file) return ''
			return file.uri() ?? ''
		}

		@$mol_mem
		avatar_files(next?: File[]) {
			if (next?.length) {
				const profile = this.profile_data()
				const store = profile.Avatar(null)!.ensure(null)
				if (store) {
					store.blob(next[0])
					profile.Avatar(null)!.remote(store)
				}
			}
			return next ?? []
		}

		@$mol_mem
		avatar_preview() {
			try {
				const uri = this.avatar_uri()
				if (uri) return this.Avatar_image()
			} catch {}
			return this.Avatar_icon()
		}

		@$mol_mem
		all_stats() {
			const profile = this.profile_data()
			const played = profile.Games_played()?.val() ?? 0
			const total = Math.round(profile.Total_score()?.val() ?? 0)
			const wins = profile.Wins()?.val() ?? 0
			const best = Math.round(profile.Best_score()?.val() ?? 0)
			const avg = played ? Math.round(total / played) : 0
			const winRate = played ? Math.round((wins / played) * 100) + '%' : '0%'
			return [
				String(played),
				String(total),
				String(wins),
				String(avg),
				String(best),
				winRate,
			]
		}

		@$mol_mem
		stat_rows() {
			return [0, 1, 2, 3, 4, 5].map(i => this.Stat_row(String(i)))
		}

		stat_label(key: string) {
			const labels = ['🎮 Игр сыграно', '⭐ Общий счёт', '🏆 Побед', '📊 Средний счёт', '🔥 Лучший счёт', '🎯 Винрейт']
			return labels[Number(key)] ?? ''
		}

		stat_value(key: string) {
			return this.all_stats()[Number(key)] ?? '0'
		}

		@$mol_mem
		persona_text() {
			const played = Number(this.all_stats()[0] ?? 0)
			let persona = personas[0]
			for (const p of personas) {
				if (played >= p.min) persona = p
			}
			return `${persona.title} — ${persona.desc}`
		}
	}
}
