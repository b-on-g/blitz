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
			return [this.Create_button(), this.Quizzes_list()]
		}

		// === My Quizzes list ===

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
			const quiz = quizzes.make([[null, $giper_baza_rank_post('just')]])
			quiz.Title('auto')?.val('New Quiz')
			quiz.Time_read('auto')?.val(5)
			quiz.Time_answer('auto')?.val(10)
			quiz.Time_leaderboard('auto')?.val(10)
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
