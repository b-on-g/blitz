namespace $.$$ {
    // Синхронизация через Гипер Базу отключена: список мастеров пустой.
    // Чистки одного masters_default мало — masters() склеивает его с пирами
    // из бандленного сида, где зашит публичный мастер. Глушим сам masters().
    $giper_baza_yard.masters_default.length = 0
    $giper_baza_yard.masters = (): string[] => []


    export class $bog_blitz extends $.$bog_blitz {

        /**
         * Путевые адреса вместо `#!`.
         *
         * Вызов стоит в статическом блоке приложения, а не в теле модуля.
         * Раньше он был на уровне namespace и срабатывал при одной лишь
         * загрузке файла — то есть у любого, кто заимствовал отсюда хоть один
         * компонент. Роутер подменяет собой глобальный `$mol_state_arg`, и
         * такой сосед молча забирал навигацию себе: у bog/journal клик менял
         * адрес, но не экран. Диагностику усложняло то, что на localhost
         * activate() объявлен как no-op, поэтому ломалось только на проде.
         *
         * Менять глобальное состояние при импорте нельзя — только при запуске
         * того приложения, которое об этом просило.
         */
        static {
            $bog_ui_router_path.activate()
        }

        @$mol_mem
        tools() {
            const is_host = this.Lobby().is_host()
            // return [is_host ? this.Radio() : null, this.Feedback_link(), this.Settings()]
            return [is_host ? this.Radio() : null, this.Settings()]
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
