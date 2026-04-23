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
			return [String(played), String(total), String(wins), String(avg), String(best), winRate]
		}

		@$mol_mem
		stat_rows() {
			return [0, 1, 2, 3, 4, 5].map(i => this.Stat_row(String(i)))
		}

		stat_label(key: string) {
			const labels = [
				'🎮 Игр сыграно',
				'⭐ Общий счёт',
				'🏆 Побед',
				'📊 Средний счёт',
				'🔥 Лучший счёт',
				'🎯 Винрейт',
			]
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

		@$mol_mem
		games_history() {
			const profile = this.profile_data()
			const list = profile.Games_history()?.remote_list() ?? []
			return list.slice().sort((a, b) => {
				const da = a.Date()?.val() ?? 0
				const db = b.Date()?.val() ?? 0
				return db - da
			})
		}

		@$mol_mem
		games_filtered() {
			const query = this.games_query().toLowerCase().trim()
			const all = this.games_history()
			if (!query) return all
			return all.filter(g => {
				const title = (g.Quiz_title()?.val() ?? '').toLowerCase()
				return title.includes(query)
			})
		}

		@$mol_mem
		games_empty_text() {
			if (this.games_history().length === 0) return 'Пока нет сыгранных игр'
			if (this.games_filtered().length === 0) return 'Ничего не найдено'
			return ''
		}

		@$mol_mem
		game_rows() {
			const games = this.games_filtered()
			if (!games.length) return []
			return games.map((_, i) => this.Game_row(String(i)))
		}

		game_record(key: string) {
			return this.games_filtered()[Number(key)]
		}

		game_arg(key: string) {
			const land = this.game_record(key)?.Land_link()?.val() ?? ''
			return { screen: 'lobby', land }
		}

		game_title(key: string) {
			return this.game_record(key)?.Quiz_title()?.val() ?? 'Untitled'
		}

		game_details(key: string) {
			const rec = this.game_record(key)
			const place = rec?.Place()?.val() ?? 0
			const players = rec?.Players_count()?.val() ?? 0
			const ts = rec?.Date()?.val() ?? 0
			const date = ts ? new Date(ts).toLocaleDateString('ru-RU') : ''
			return `${date} · ${place}/${players} место`
		}

		game_score(key: string) {
			const score = Math.round(this.game_record(key)?.Score()?.val() ?? 0)
			return String(score)
		}
	}
}
