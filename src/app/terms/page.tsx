export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1c2024] mb-8">서비스 이용약관 및 개인정보 수집·이용 동의</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">1. 개인정보 수집 및 이용 목적</h2>
            <div className="text-gray-700 space-y-2">
              <p>고뮤니티는 다음의 목적을 위하여 개인정보를 수집 및 이용합니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>서비스 회원가입 및 관리</li>
                <li>맞춤형 서비스 및 콘텐츠 제공</li>
                <li>커뮤니티 활동 지원</li>
                <li>고객 문의 및 불만 처리</li>
                <li>서비스 개선 및 통계 분석</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">2. 수집하는 개인정보 항목</h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>필수 정보:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>닉네임</li>
                <li>성별</li>
                <li>나이대</li>
                <li>관심 카테고리</li>
                <li>카카오 계정 정보 (카카오 로그인 시)</li>
              </ul>
              <p className="mt-4"><strong>선택 정보:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>프로필 사진</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">3. 개인정보 보유 및 이용기간</h2>
            <div className="text-gray-700 space-y-2">
              <p>수집된 개인정보는 다음과 같이 보유 및 이용됩니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>회원 탈퇴 시까지</li>
                <li>법령에 따른 보존 의무가 있는 경우 해당 기간까지</li>
                <li>개인정보 처리목적 달성 후 지체없이 파기</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">4. 콘텐츠 노출 및 활용 동의</h2>
            <div className="text-gray-700 space-y-2">
              <p>본 동의는 다음 사항에 대한 동의를 포함합니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>회원이 작성한 게시글, 댓글 등의 콘텐츠가 다른 회원에게 공개될 수 있습니다</li>
                <li>작성한 콘텐츠는 서비스 운영 및 개선을 위해 활용될 수 있습니다</li>
                <li>콘텐츠는 서비스 내에서만 활용되며, 외부 제3자에게 제공되지 않습니다</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">5. 맞춤형 추천 서비스 동의</h2>
            <div className="text-gray-700 space-y-2">
              <p>본 동의는 다음 사항에 대한 동의를 포함합니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>수집된 개인정보를 바탕으로 맞춤형 콘텐츠를 추천받을 수 있습니다</li>
                <li>관심 카테고리, 활동 내역 등을 분석하여 개인화된 서비스를 제공합니다</li>
                <li>추천 서비스는 서비스 품질 향상을 위해 지속적으로 개선됩니다</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">6. 개인정보 처리 위탁</h2>
            <div className="text-gray-700 space-y-2">
              <p>고뮤니티는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁하고 있습니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>위탁업체: Supabase (데이터베이스 관리)</li>
                <li>위탁업무: 데이터 저장 및 관리</li>
                <li>위탁업체: Vercel (호스팅 서비스)</li>
                <li>위탁업무: 웹 서비스 호스팅</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">7. 정보주체의 권리</h2>
            <div className="text-gray-700 space-y-2">
              <p>회원은 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>개인정보 처리현황 통지 요구</li>
                <li>개인정보 열람 요구</li>
                <li>개인정보 정정·삭제 요구</li>
                <li>개인정보 처리정지 요구</li>
                <li>동의 철회</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1c2024] mb-4">8. 문의처</h2>
            <div className="text-gray-700 space-y-2">
              <p>개인정보 처리에 관한 문의사항은 다음으로 연락해 주시기 바랍니다:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>이메일: privacy@gomunity.co.kr</li>
                <li>전화: 02-1234-5678</li>
              </ul>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              본 약관은 2024년 10월 16일부터 시행됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}