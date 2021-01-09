---

title: Ubuntu 20.04에서 소리가 정상적으로 출력되지 않는 경우

excerpt: "우분투에서 가짜출력이 나오거나, 스피커 상호작용은 정상적으로 표시되지만 소리가 출력되지 않을 시 해결방법"

classes: wide

  

last_modified_at: 2021-01-06T01:20:00
use_mermaid: true

categories:
- 기타
tags:
- Ubuntu
- alsa
- pulseaudio
- dummy output
---
## 1. 해결방법
**원문:** https://www.maketecheasier.com/fix-no-sound-issue-ubuntu/    
    
위 주소에서 도움을 받아 해결할 수 있었다. 마지막 방법인 패키지 재설치를 시도해보자.    
유의할 점은 설정파일도 제거할 수 있도록 반드시 **purge**를 실행해야 한다는 것이다.   

다음 명령어를 실행하고 재부팅하면 해결된다.
````
$ sudo apt remove --purge alsa-base    
$ sudo apt remove --purge pulseaudio    
     
$ sudo apt install alsa-base    
$ sudo apt install pulseaudio    
     
$ sudo alsa force-reload    
````

## 2. ALSA와 Pulseaudio
**원문:** https://makersweb.net/linux/19723    
**이하 내용은 관련 지식을 알아둘 목적으로만 적어둔 것입니다. 제가 작성한 내용이 아닙니다.**

### ALSA
ALSA(Advanced Linux Sound Architecture)는 응용 프로그램이 시스템의 실제 하드웨어와 상호작용할 수 있는 가장 낮은 수준의 인터페이스이다. ALSA는 한 번에 하나의 채널만 하드웨어로 전송하게 되고, 이로 인해 단일 응용프로그램만 ALSA에 한 번에 소리를 보낼 수 있다. 미디어 플레이어의 음악과 메신저의 알림음을 동시에 받을 수 없다.

이것을 개선하기 위해 Mixer를 구현하고, 여러 가상 오디오 채널을 단일 채널로 결합할 수 있게 한 것이 alsalib이다. 하지만, 라이브러리 수준의 믹싱 방식은 데스크톱 환경에서는 단일 응용 프로그램만 오디오를 출력할 수 있다.

### Pulseaudio
Pulseaudio는 Linux 배포판의 표준 사운드 서버이다.

데스크톱 환경에서는 여러 응용 프로그램의 사운드를 병렬로 출력할 수 있어야 했다. 이를 구현하고자 사운드 서버가 등장했다. 사운드 서버는 데몬(daemon, 컴퓨터의 백그라운드에서 지속적으로 실행되는 서비스)이다.

사운드 서버는 소리를 출력해야 하는 모든 애플리케이션에 믹서슬롯을 제공한다. 사운드 서버는 들어오는 모든 오디오 슬롯을 하나로 믹싱하여 ALSA에 전달한다. 이 방법으로 여러 응용프로그램의 소리를 병렬로 출력할 수 있었으며, 개별 볼륨제어 등 다른기능도 구현할 수 있게 되었다.    

<center><div class = "mermaid">
graph TB
A["application"] --> E["Sound server: Pulseaudio"]
B["application"] --> E
C["application"] --> E
D["application"] --> E

E --> F["Linux kernel: ALSA"]
F --> G["Hardware: Soundcard"]
</div></center>