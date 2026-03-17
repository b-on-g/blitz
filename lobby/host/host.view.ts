namespace $.$$ {
	export class $bog_blitz_lobby_host extends $.$bog_blitz_lobby_host {
		@$mol_mem
		qr_data() {
			return this.$.$mol_state_arg.make_link({
				screen: 'lobby',
				land: this.$.$mol_state_arg.value('land') ?? '',
			})
		}

		@$mol_mem
		start(e?: any) {
			if (e) {
				const quiz = this.quiz_data() as $bog_blitz_quiz | null
				if (!quiz) return
				quiz.Game_state('auto')?.val('reading')
				quiz.Current_question('auto')?.val(0)
				quiz.Round_start('auto')?.val(Date.now())
			}
			return null
		}
	}
}
