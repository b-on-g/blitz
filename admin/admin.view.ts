namespace $.$$ {
	export class $bog_blitz_admin extends $.$bog_blitz_admin {
		@$mol_mem
		home_ref() {
			const home = this.$.$giper_baza_glob.home()
			return home.land().Data($bog_blitz_home_ref)
		}

		@$mol_action
		quizzes_land_make() {
			const land = this.$.$giper_baza_glob.land_grab([
				[null, $giper_baza_rank_read],
			])
			this.home_ref().Quizzes_land('auto')?.val(land.link().str)
			return land
		}

		@$mol_mem
		quizzes_land() {
			const link_str = this.home_ref().Quizzes_land()?.val()
			if (!link_str) return this.quizzes_land_make()
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link_str))
		}

		@$mol_mem
		registry() {
			return this.quizzes_land().Data($bog_blitz_registry)
		}

		@$mol_mem
		quiz_links() {
			return this.registry().Quizzes()?.remote_list() ?? []
		}

		@$mol_mem
		shared_quiz_links() {
			return this.registry().Shared_quizzes()?.remote_list() ?? []
		}

		quiz_by_key(key: string) {
			if (key.startsWith('s_')) {
				return this.shared_quiz_links()[Number(key.slice(2))]
			}
			return this.quiz_links()[Number(key)]
		}

		@$mol_mem
		current_quiz_link() {
			return this.$.$mol_state_arg.value('quiz') ?? ''
		}

		current_quiz_land() {
			const link = this.current_quiz_link()
			if (!link) return null
			return this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
		}

		@$mol_mem
		is_game_land() {
			const land = this.current_quiz_land()
			if (!land) return false
			const session = land.Data($bog_blitz_session)
			return !!session.Quiz_link()?.val()
		}

		@$mol_mem
		ensure_in_registry() {
			const link = this.current_quiz_link()
			if (!link) return
			if (this.is_game_land()) return
			const own = this.quiz_links()
			if (own.some(q => q.land().link().str === link)) return
			const shared = this.shared_quiz_links()
			if (shared.some(q => q.land().link().str === link)) return
			const shared_quizzes = this.registry().Shared_quizzes('auto')!
			shared_quizzes.add(new $giper_baza_link(link))
		}

		@$mol_mem
		admin_body() {
			if (this.current_quiz_link()) {
				if (this.is_game_land()) {
					return [this.Back_button(), this.Game_land_warning()]
				}
				this.ensure_in_registry()
				return [this.Back_button(), this.Editor()]
			}
			return [
				this.Create_button(),
				this.Bot_expander(),
				this.Import_expander(),
				this.Quizzes_list(),
			]
		}

		import_json_template() {
			return [
				'{',
				'  "title": "Quiz Title",',
				'  "time_read": 5,',
				'  "time_answer": 10,',
				'  "time_reveal": 5,',
				'  "time_leaderboard": 10,',
				'  "points_base": 100,',
				'  "time_multiplier": 1.5,',
				'  "questions": [',
				'    {',
				'      "text": "Question?",',
				'      "type": "choice",',
				'      "options": [',
				'        { "text": "Option A", "is_correct": true },',
				'        { "text": "Option B", "is_correct": false }',
				'      ]',
				'    },',
				'    {',
				'      "text": "What is 2+2?",',
				'      "type": "text_input",',
				'      "correct_text": "4, four"',
				'    }',
				'  ]',
				'}',
			].join('\n')
		}

		create_quiz_from_json(text: string) {
			let data: any
			try {
				data = JSON.parse(text)
			} catch {
				return
			}

			const quizzes = this.registry().Quizzes('auto')!
			const quiz = quizzes.make([[null, $giper_baza_rank_post('just')]])

			quiz.Title('auto')?.val(data.title ?? 'Imported Quiz')
			quiz.Time_read('auto')?.val(data.time_read ?? 5)
			quiz.Time_answer('auto')?.val(data.time_answer ?? 10)
			quiz.Time_reveal('auto')?.val(data.time_reveal ?? 5)
			quiz.Time_leaderboard('auto')?.val(data.time_leaderboard ?? 10)
			quiz.Points_base('auto')?.val(data.points_base ?? 100)
			quiz.Time_multiplier('auto')?.val(data.time_multiplier ?? 1.5)

			if (Array.isArray(data.questions)) {
				const questions_list = quiz.Questions('auto')!
				for (const qData of data.questions) {
					const q = questions_list.make(null)
					q.Text('auto')?.val(qData.text ?? '')
					q.Type('auto')?.val(qData.type ?? 'choice')

					if (qData.type === 'text_input' && qData.correct_text) {
						q.Correct_text('auto')?.val(qData.correct_text)
					}

					if (Array.isArray(qData.options)) {
						const options_list = q.Options('auto')!
						for (const oData of qData.options) {
							const opt = options_list.make(null)
							opt.Text('auto')?.val(oData.text ?? '')
							opt.Is_correct('auto')?.val(oData.is_correct ?? false)
						}
					}
				}
			}
		}

		@$mol_mem
		override import_json_text(next?: string) {
			return next ?? this.import_json_template()
		}

		@$mol_action
		import_json() {
			const text = this.import_json_text()
			if (!text) return
			this.create_quiz_from_json(text)
			this.import_json_text(this.import_json_template())
		}

		@$mol_action
		import_bot_quiz(text: string) {
			if (!text) return

			try {
				const data = JSON.parse(text)
				const title = data.title ?? ''
				if (title) {
					const existing = this.quiz_links().find(
						q => q.Title()?.val() === title
					)
					if (existing) return
				}
			} catch {}

			this.create_quiz_from_json(text)
		}

		@$mol_mem_key
		quiz_is_shared(key: string) {
			return key.startsWith('s_')
		}

		@$mol_action
		share_quiz(key: string) {
			const quiz = this.quiz_by_key(key)
			if (!quiz) return
			const link = quiz.land().link().str
			const loc = this.$.$mol_dom_context.location
			const url = loc.origin + loc.pathname + '?screen=admin&quiz=' + encodeURIComponent(link)
			this.$.$mol_dom_context.navigator.clipboard.writeText(url)
		}

		@$mol_mem
		quiz_rows() {
			const own = this.quiz_links()
			const shared = this.shared_quiz_links()
			const rows: $mol_view[] = []
			for (let i = 0; i < own.length; i++) {
				rows.push(this.Quiz_card(String(i)))
			}
			for (let i = 0; i < shared.length; i++) {
				rows.push(this.Quiz_card(`s_${i}`))
			}
			return rows
		}

		@$mol_mem_key
		quiz_title(key: string, next?: string) {
			const quiz = this.quiz_by_key(key)
			if (!quiz) return ''
			if (next !== undefined) {
				quiz.Title('auto')?.val(next)
				return next
			}
			return quiz.Title()?.val() ?? 'Untitled Quiz'
		}

		@$mol_action
		create_quiz() {
			const quizzes = this.registry().Quizzes('auto')!
			const count = this.quiz_links().length
			const quiz = quizzes.make([[null, $giper_baza_rank_post('just')]])
			quiz.Title('auto')?.val(`New Quiz ${count + 1}`)
			quiz.Time_read('auto')?.val(5)
			quiz.Time_answer('auto')?.val(10)
			quiz.Time_reveal('auto')?.val(5)
			quiz.Time_leaderboard('auto')?.val(10)
			quiz.Points_base('auto')?.val(100)
			quiz.Time_multiplier('auto')?.val(1.5)
		}

		@$mol_action
		edit_quiz(key: string) {
			const quiz = this.quiz_by_key(key)
			if (!quiz) return
			this.$.$mol_state_arg.value('quiz', quiz.land().link().str)
		}

		@$mol_action
		delete_quiz(key: string) {
			const quiz = this.quiz_by_key(key)
			if (!quiz) return
			if (key.startsWith('s_')) {
				this.registry().Shared_quizzes('auto')!.cut(quiz.link())
			} else {
				this.registry().Quizzes('auto')!.cut(quiz.link())
			}
		}

		@$mol_action
		start_quiz(key: string) {
			const quiz = this.quiz_by_key(key)
			if (!quiz) return

			// Session land — все могут писать (игроки регистрируются)
			const session_land = this.$.$giper_baza_glob.land_grab([
				[null, $giper_baza_rank_post('just')],
			])

			// Encrypted land — только хост читает правильные ответы
			const key_land = this.$.$giper_baza_glob.land_grab([
				[null, $giper_baza_rank_deny],
			])
			const answers_key = key_land.Data($bog_blitz_answers_key)
			const questions = quiz.Questions()?.remote_list() ?? []
			const keys: { type: string; correct: string }[] = []
			for (const q of questions) {
				const type = q.Type()?.val() ?? 'choice'
				if (type === 'text_input') {
					keys.push({ type, correct: q.Correct_text()?.val() ?? '' })
				} else {
					const options = q.Options()?.remote_list() ?? []
					const indices: number[] = []
					for (let i = 0; i < options.length; i++) {
						if ((options[i] as $bog_blitz_question_option)?.Is_correct()?.val()) {
							indices.push(i)
						}
					}
					keys.push({ type, correct: indices.join(',') })
				}
			}
			answers_key.Data('auto')?.val(JSON.stringify(keys))

			const session = session_land.Data($bog_blitz_session)
			session.Quiz_link('auto')?.val(quiz.land().link().str)
			session.Answers_key_land('auto')?.val(key_land.link().str)

			const Players_dict = $giper_baza_dict_to($bog_blitz_player)
			const dict = session_land.Data(Players_dict)
			const lord = this.$.$giper_baza_auth.current().pass().lord().str
			const player = dict.key(lord, 'auto')
			if (player) {
				player.IsHost('auto')?.val(true)
			}

			this.$.$mol_state_arg.value('quiz', null)
			this.$.$mol_state_arg.value('land', session_land.link().str)
			this.$.$mol_state_arg.value('screen', 'lobby')
		}

		@$mol_action
		duplicate_quiz(key: string) {
			const source = this.quiz_by_key(key)
			if (!source) return

			const quizzes = this.registry().Quizzes('auto')!
			const target = quizzes.make([[null, $giper_baza_rank_post('just')]])

			target.Title('auto')?.val(source.Title()?.val() ?? 'Untitled Quiz')
			target.Time_read('auto')?.val(source.Time_read()?.val() ?? 5)
			target.Time_answer('auto')?.val(source.Time_answer()?.val() ?? 10)
			target.Time_reveal('auto')?.val(source.Time_reveal()?.val() ?? 5)
			target.Time_leaderboard('auto')?.val(source.Time_leaderboard()?.val() ?? 10)
			target.Points_base('auto')?.val(source.Points_base()?.val() ?? 100)
			target.Time_multiplier('auto')?.val(source.Time_multiplier()?.val() ?? 1.5)

			const source_questions = source.Questions()?.remote_list() ?? []
			if (source_questions.length) {
				const target_questions = target.Questions('auto')!
				for (const sq of source_questions) {
					const tq = target_questions.make(null)
					tq.Text('auto')?.val(sq.Text()?.val() ?? '')
					tq.Type('auto')?.val(sq.Type()?.val() ?? 'choice')

					if (sq.Type()?.val() === 'text_input') {
						tq.Correct_text('auto')?.val(sq.Correct_text()?.val() ?? '')
					}

					const source_options = sq.Options()?.remote_list() ?? []
					if (source_options.length) {
						const target_options = tq.Options('auto')!
						for (const so of source_options) {
							const to = target_options.make(null)
							to.Text('auto')?.val(so.Text()?.val() ?? '')
							to.Is_correct('auto')?.val(so.Is_correct()?.val() ?? false)
						}
					}
				}
			}

			if (key.startsWith('s_')) {
				this.registry().Shared_quizzes('auto')!.cut(source.link())
			} else {
				this.registry().Quizzes('auto')!.cut(source.link())
			}
		}

		@$mol_action
		back_to_list() {
			this.$.$mol_state_arg.value('quiz', null)
		}
	}
}
