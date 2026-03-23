namespace $.$$ {

	const stations = [
		{ id: 'lofi', title: '🎧 Lofi Hip Hop', url: 'https://listen.reyfm.de/lofi_320kbps.mp3' },
		{ id: 'chill', title: '☕ Chillhop', url: 'https://ilm.stream35.radiohost.de/ilm_ilovechillhop_mp3-192' },
		{ id: 'party', title: '🎉 House Party', url: 'https://listen.reyfm.de/houseparty_192kbps.mp3' },
		{ id: 'dj', title: '🎵 DJ Charts', url: 'https://breakz-high.rautemusik.fm/' },
		{ id: 'lounge', title: '🍸 Workday Lounge', url: 'https://stream.epic-lounge.com/workday-lounge' },
	]

	export class $bog_blitz_radio extends $.$bog_blitz_radio {

		audio: HTMLAudioElement | null = null

		@$mol_mem
		current_station(next?: string) {
			return next ?? ''
		}

		@$mol_mem
		volume(next?: number) {
			if (next !== undefined) {
				this.$.$mol_state_local.value('bog_blitz_radio_volume', next)
				return next
			}
			return this.$.$mol_state_local.value('bog_blitz_radio_volume') as number ?? 50
		}

		@$mol_mem
		volume_input(next?: string): string {
			if (next !== undefined) {
				const num = parseInt(next, 10)
				if (!isNaN(num)) {
					const vol = Math.max(0, Math.min(100, num))
					this.volume(vol)
					if (this.audio) this.audio.volume = vol / 100
				}
				return next
			}
			const playing = this.current_station()
			const vol = this.volume()
			if (!playing) return `🔇 ${vol}%`
			return `🔊 ${vol}%`
		}

		@$mol_mem
		volume_up(next?: Event) {
			if (next !== undefined) {
				const vol = Math.min(100, this.volume() + 10)
				this.volume(vol)
				if (this.audio) this.audio.volume = vol / 100
			}
		}

		@$mol_mem
		volume_down(next?: Event) {
			if (next !== undefined) {
				const vol = Math.max(0, this.volume() - 10)
				this.volume(vol)
				if (this.audio) this.audio.volume = vol / 100
			}
		}

		@$mol_mem
		station_keys() {
			return stations.map(s => s.id)
		}

		@$mol_mem
		menu_content() {
			return [
				this.Volume_row(),
				this.Stop_button(),
				...this.station_keys().map(id => this.Station(id)),
			]
		}

		@$mol_mem_key
		station_title(id: string) {
			const s = stations.find(s => s.id === id)
			const prefix = this.current_station() === id ? '▶ ' : ''
			return prefix + (s?.title ?? id)
		}

		@$mol_mem_key
		station_click(id: string, e?: Event) {
			if (e) {
				this.play(id)
			}
			return null
		}

		@$mol_mem
		stop_click(next?: Event) {
			if (next !== undefined) {
				this.stop()
			}
		}

		play(id: string) {
			this.stop()
			const s = stations.find(s => s.id === id)
			if (!s) return
			const audio = new Audio(s.url)
			audio.volume = this.volume() / 100
			audio.play().catch(() => {})
			this.audio = audio
			this.current_station(id)
		}

		stop() {
			if (this.audio) {
				this.audio.pause()
				this.audio.src = ''
				this.audio = null
			}
			this.current_station('')
		}
	}
}
