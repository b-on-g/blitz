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
				const session = this.session() as $bog_blitz_session | null
				if (!session) return
				session.Current_question('auto')?.val(0)

				// Publish multi_correct for first question
				const key_link = session.Answers_key_land()?.val()
				if (key_link) {
					const key_land = this.$.$giper_baza_glob.Land(new $giper_baza_link(key_link))
					const raw = key_land.Data($bog_blitz_answers_key).Data()?.val()
					if (raw) {
						try {
							const keys = JSON.parse(raw) as { type: string; correct: string }[]
							const first = keys[0]
							if (first) {
								const multi = first.type !== 'text_input' && first.correct.split(',').length >= 2
								session.Multi_correct('auto')?.val(multi)
							}
						} catch {}
					}
				}

				session.Round_start('auto')?.val(Date.now())
				session.Game_state('auto')?.val('reading')
			}
			return null
		}
	}
}
