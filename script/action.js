$(document).ready(function() {
    $('#fullpage').fullpage({
      anchors: ['#s1', '#s2', '#s3', '#s4', '#s5'],
      navigation: true,
      navigationPosition: 'right',

      // 페이지가 변경될 때 호출되는 함수
    afterLoad: function(origin, destination, direction) {
        const sectionIndex = destination.index; // 현재 섹션의 인덱스
        updateIndicator(sectionIndex); // 인디케이터 위치 업데이트
        updateMenu(sectionIndex); // 메뉴에 'on' 클래스 추가
      }
    });
  
    // 인디케이터 위치를 업데이트하는 함수
    function updateIndicator(index) {
      const buttonHeight = $('.button-bar li').outerHeight(true); // 각 버튼의 높이 계산
      const newTop = index * buttonHeight; // 인덱스에 맞춰 동그라미 위치 계산
      $('.indicator').css('top', newTop + 'px'); // 동그라미 위치 업데이트
    }
  
    // 메뉴 항목에 'on' 클래스를 추가하는 함수
    function updateMenu(index) {
      $('.button-bar li').removeClass('on'); // 모든 'on' 클래스 제거
      $('.button-bar li').eq(index).addClass('on'); // 현재 섹션에 'on' 클래스 추가
    }
  
    // 메뉴 버튼 클릭 이벤트
    $('.button-bar a').on('click', function(e) {
      e.preventDefault(); // 기본 링크 동작 막기
      const sectionIndex = $(this).parent().index(); // 현재 클릭한 버튼의 인덱스
      $.fn.fullpage.moveTo(sectionIndex + 1); // 해당 섹션으로 이동 (섹션 번호는 1부터 시작)
      updateIndicator(sectionIndex); // 인디케이터 위치 업데이트
    });
  });

  // 확대/축소 방지 코드
  document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

// 페이지 로드 시 기본 배율로 설정
document.body.style.zoom = "100%"; // 일부 브라우저에서 배율을 강제 설정