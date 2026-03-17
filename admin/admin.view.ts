namespace $.$$ {
	export class $bog_blitz_admin extends $.$bog_blitz_admin {
		@$mol_mem
		registry() {
			const home = this.$.$giper_baza_glob.home()
			return home.land().Data($bog_blitz_registry)
		}

		@$mol_mem
		quiz_links() {
			return this.registry().Quizzes()?.remote_list() ?? []
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
		admin_body() {
			if (this.current_quiz_link()) {
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
			this.create_quiz_from_json(text)
		}

		@$mol_mem
		quiz_rows() {
			return this.quiz_links().map((quiz, i) => {
				const key = String(i)
				return this.Quiz_card(key)
			})
		}

		@$mol_mem_key
		quiz_title(key: string, next?: string) {
			const quiz = this.quiz_links()[Number(key)]
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
			quiz.Time_leaderboard('auto')?.val(10)
			quiz.Points_base('auto')?.val(100)
			quiz.Time_multiplier('auto')?.val(1.5)
		}

		@$mol_action
		edit_quiz(key: string) {
			const quiz = this.quiz_links()[Number(key)]
			if (!quiz) return
			this.$.$mol_state_arg.value('quiz', quiz.land().link().str)
		}

		@$mol_action
		delete_quiz(key: string) {
			const quizzes = this.registry().Quizzes('auto')!
			const quiz = this.quiz_links()[Number(key)]
			if (quiz) {
				quizzes.cut(quiz.link())
			}
		}

		@$mol_action
		start_quiz(key: string) {
			const quiz = this.quiz_links()[Number(key)]
			if (!quiz) return
			const game_land = quiz.land().fork([[null, $giper_baza_rank_post('just')]])
			this.$.$mol_state_arg.value('quiz', null)
			this.$.$mol_state_arg.value('land', game_land.link().str)
			this.$.$mol_state_arg.value('screen', 'lobby')
		}

		@$mol_action
		back_to_list() {
			this.$.$mol_state_arg.value('quiz', null)
		}
	}
}
