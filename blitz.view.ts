namespace $.$$ {
    export class $bog_blitz extends $.$bog_blitz {
        @$mol_mem
        tools() {
            const is_host = this.Lobby().is_host()
            return [is_host ? this.Radio() : null, this.Feedback_link(), this.Settings()]
        }

        screen_body() {
            const page = (this.pages() as Record<string, any>)[this.screen()]
            return page ? [page] : []
        }

        screen(next?: string) {
            if (next !== undefined) {
                this.mobile_menu_showed(false)
                if (next === 'lobby') {
                    this.$.$mol_state_arg.value('quiz', null)
                }
            }
            return this.$.$mol_state_arg.value('screen', next || undefined) || 'admin'
        }
    }
}
