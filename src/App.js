import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Copy,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import { Analytics } from '@vercel/analytics/react';
import levels from "./data/levels.json"; // 레벨 데이터 json 임포트
import kanjiData from "./data/kanjiData.json"; // 한자 데이터 json 임포트

//useState, useEffect, useRef선언부
const KanjiLearningApp = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sortBy, setSortBy] = useState("difficulty");
  const [savedKanji, setSavedKanji] = useState(() => {
    try {
      const savedItem = localStorage.getItem("savedKanjiData"); // 저장할 때 사용할 키
      return savedItem ? JSON.parse(savedItem) : [];
    } catch (error) {
      console.error("저장된 한자 데이터를 불러오는 중 오류 발생:", error);
      return [];
    }
  });
  const [contextMenu, setContextMenu] = useState({
    show: false,
    kanji: null,
    x: 0,
    y: 0,
  });
  const [studyMode, setStudyMode] = useState("study"); // 'study' or 'reading'

  const getCurrentKanjiList = () => {
    if (selectedLevel === "all") {
      return [
        ...kanjiData.elementary1,
        ...kanjiData.elementary2,
        ...kanjiData.elementary3,
        ...kanjiData.elementary4,
        ...kanjiData.elementary5,
        ...kanjiData.elementary6,
        ...kanjiData.middle1,
        ...kanjiData.middle2,
        ...kanjiData.middle3,
        ...kanjiData.middle4,
      ];
    }
    return kanjiData[selectedLevel] || [];
  };

  const currentKanji = getCurrentKanjiList()[currentKanjiIndex];

  const handleKanjiClick = () => {
    setShowAnswer(true);
  };

  const nextKanji = () => {
    const kanjiList = getCurrentKanjiList();
    if (currentKanjiIndex < kanjiList.length - 1) {
      setCurrentKanjiIndex(currentKanjiIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevKanji = () => {
    if (currentKanjiIndex > 0) {
      setCurrentKanjiIndex(currentKanjiIndex - 1);
      setShowAnswer(false);
    }
  };

  const addToSaved = (kanji) => {
    const isAlreadySaved = savedKanji.find((k) => k.kanji === kanji.kanji);

    if (isAlreadySaved) {
      // 이미 저장된 경우 제거 (토글)
      setSavedKanji(savedKanji.filter((k) => k.kanji !== kanji.kanji));
    } else {
      // 저장되지 않은 경우 추가
      setSavedKanji([...savedKanji, { ...kanji, savedAt: new Date() }]);
    }
  };

  const removeFromSaved = (kanjiChar) => {
    setSavedKanji(savedKanji.filter((k) => k.kanji !== kanjiChar));
  };

  const handleSliderChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setCurrentKanjiIndex(newIndex);
    setShowAnswer(false);
  };

  const startStudy = (level, mode = "study") => {
    setSelectedLevel(level);
    setCurrentKanjiIndex(0);
    setShowAnswer(false);
    setStudyMode(mode);
    setCurrentScreen("study");
  };

  const handleContextMenu = (e, kanji) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      kanji,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const copyKanji = (kanji) => {
    navigator.clipboard.writeText(kanji);
    setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
  };

  const searchKanji = (kanji) => {
    window.open(`https://nihongokanji.com/search/${kanji}`, "_blank");
    setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
  };

  const getKanjiLevel = (kanjiChar) => {
    if (kanjiData.elementary1.find((k) => k.kanji === kanjiChar)) return "초1";
    if (kanjiData.elementary2.find((k) => k.kanji === kanjiChar)) return "초2";
    if (kanjiData.elementary3.find((k) => k.kanji === kanjiChar)) return "초3";
    if (kanjiData.elementary4.find((k) => k.kanji === kanjiChar)) return "초4";
    if (kanjiData.elementary5.find((k) => k.kanji === kanjiChar)) return "초5";
    if (kanjiData.elementary6.find((k) => k.kanji === kanjiChar)) return "초6";
    if (kanjiData.middle1.find((k) => k.kanji === kanjiChar)) return "중학-1";
    if (kanjiData.middle2.find((k) => k.kanji === kanjiChar)) return "중학-2";
    if (kanjiData.middle3.find((k) => k.kanji === kanjiChar)) return "중학-3";
    if (kanjiData.middle4.find((k) => k.kanji === kanjiChar)) return "중학-4";
    return "기타";
  };

  const getKanjiDiff = (kanjiChar) => {
    if (kanjiData.elementary1.find((k) => k.kanji === kanjiChar)) return 1;
    if (kanjiData.elementary2.find((k) => k.kanji === kanjiChar)) return 2;
    if (kanjiData.elementary3.find((k) => k.kanji === kanjiChar)) return 3;
    if (kanjiData.elementary4.find((k) => k.kanji === kanjiChar)) return 4;
    if (kanjiData.elementary5.find((k) => k.kanji === kanjiChar)) return 5;
    if (kanjiData.elementary6.find((k) => k.kanji === kanjiChar)) return 6;
    if (kanjiData.middle1.find((k) => k.kanji === kanjiChar)) return 7;
    if (kanjiData.middle2.find((k) => k.kanji === kanjiChar)) return 8;
    if (kanjiData.middle3.find((k) => k.kanji === kanjiChar)) return 9;
    if (kanjiData.middle4.find((k) => k.kanji === kanjiChar)) return 10;
  };

  const getSortedSavedKanji = () => {
    if (sortBy === "difficulty") {
      return [...savedKanji].sort((a, b) => {
        const aLevel = getKanjiDiff?.(a.kanji);
        const bLevel = getKanjiDiff?.(b.kanji);
        return aLevel - bLevel;
      });
    }

    if (sortBy === "registration") {
      return [...savedKanji].sort(
        (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
      );
    }

    if (sortBy === "random") {
      return [...savedKanji].sort(() => Math.random() - 0.5);
    }
  };

  useEffect(() => {
    try {
      // savedKanji 상태가 변경될 때마다 localStorage에 저장합니다.
      // 배열을 문자열로 변환하기 위해 JSON.stringify를 사용합니다.
      localStorage.setItem("savedKanjiData", JSON.stringify(savedKanji));
    } catch (error) {
      console.error("한자 데이터를 저장하는 중 오류 발생:", error);
    }
  }, [savedKanji]); // savedKanji 배열이 변경될 때마다 이 effect가 실행됩니다.

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
    };

    if (contextMenu.show) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [contextMenu.show]);

  // 메인화면
  if (currentScreen === "main") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-red-400 text-white p-4 text-center">
          <h1 className="text-lg font-bold">일본어 상용한자 외우기 v1.1</h1>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-white m-4 p-4 rounded border border-gray-200 text-sm text-gray-600">
          한자를 길게 누르면 메뉴가 표시됩니다. 한자 복사, 한자사전 검색을 하실
          수 있습니다.
        </div>

        {/* 레벨 선택 */}
        <div className="p-4 space-y-4">
          {levels.map((level) => (
            <div
              key={level.key}
              className={`rounded border p-4 ${
                level.count > 0
                  ? "bg-white border-gray-200"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-medium ${
                    level.count === 0 ? "text-gray-400" : ""
                  }`}
                >
                  {level.name} {level.count}자
                  {level.count === 0 && (
                    <span className="text-xs text-gray-500 ml-2">(준비중)</span>
                  )}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      level.count > 0
                        ? startStudy(level.key, "reading")
                        : alert("아직 데이터가 준비되지 않았습니다.")
                    }
                    disabled={level.count === 0}
                    className={`px-4 py-2 rounded text-sm ${
                      level.count > 0
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    읽기
                  </button>
                  <button
                    onClick={() =>
                      level.count > 0
                        ? startStudy(level.key, "study")
                        : alert("아직 데이터가 준비되지 않았습니다.")
                    }
                    disabled={level.count === 0}
                    className={`px-4 py-2 rounded text-sm ${
                      level.count > 0
                        ? "bg-gray-500 text-white hover:bg-gray-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    학습
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-7">
          <button
            onClick={() => setCurrentScreen("main")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">시작</div>
          </button>
          <button
            onClick={() => setCurrentScreen("study")}
            className="flex-1 p-3 text-center text-red-500"
          >
            <div className="text-xs">학습</div>
          </button>
          <button className="flex-1 p-3 text-center text-gray-600">
            <div className="text-xs">검색</div>
          </button>
          <button
            onClick={() => setCurrentScreen("saved")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">내 한자</div>
          </button>
        </div>
      </div>
    );
  }

  // 학습화면
  if (currentScreen === "study") {
    const kanjiList = getCurrentKanjiList();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-red-400 text-white p-4 flex items-center justify-between">
          <button onClick={() => setCurrentScreen("main")}>
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <div className="text-sm">
              {studyMode === "reading" ? "읽기" : "학습"}
            </div>
            <div className="text-xs">일본어 상용한자 외우기</div>
          </div>
          <div></div>
        </div>

        {/* 진행상황 */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">
              {selectedLevel === "elementary1"
                ? "초등1학년"
                : selectedLevel === "elementary2"
                ? "초등2학년"
                : selectedLevel === "elementary3"
                ? "초등3학년"
                : selectedLevel === "elementary4"
                ? "초등4학년"
                : selectedLevel === "elementary5"
                ? "초등5학년"
                : selectedLevel === "elementary6"
                ? "초등6학년"
                : selectedLevel === "middle1"
                ? "중학교-①"
                : selectedLevel === "middle2"
                ? "중학교-②"
                : selectedLevel === "middle3"
                ? "중학교-③"
                : selectedLevel === "middle4"
                ? "중학교-④"
                : "전체"}
              {kanjiList.length}자 {studyMode === "reading" ? "읽기" : "학습"}
            </span>
            <span className="text-red-500">
              {currentKanjiIndex + 1} / {kanjiList.length}
            </span>
          </div>
        </div>

        {/* 한자 카드 */}
        <div className="pt-24 pb-8 px-8 flex justify-center">
          <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[350px] w-full max-w-md">
            {currentKanji ? (
              <div className="text-center space-y-6">
                <div
                  className={`text-8xl font-bold text-red-600 p-4 rounded ${
                    studyMode === "study"
                      ? "cursor-pointer hover:bg-gray-50"
                      : ""
                  }`}
                  onClick={studyMode === "study" ? handleKanjiClick : undefined}
                >
                  {currentKanji.kanji}
                </div>

                {studyMode === "reading" || showAnswer ? (
                  <div className="space-y-4">
                    <div className="text-lg">{currentKanji.reading}</div>
                    <div className="text-gray-600">{currentKanji.meaning}</div>
                    <button
                      onClick={() => addToSaved(currentKanji)}
                      className={`flex items-center justify-center space-x-2 mx-auto px-4 py-2 rounded text-sm transition-all duration-200 ${
                        savedKanji.find((k) => k.kanji === currentKanji.kanji)
                          ? "bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-500"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Star
                        size={16}
                        className={
                          savedKanji.find((k) => k.kanji === currentKanji.kanji)
                            ? "text-white"
                            : "text-gray-500"
                        }
                        fill={
                          savedKanji.find((k) => k.kanji === currentKanji.kanji)
                            ? "currentColor"
                            : "none"
                        }
                      />
                      <span>
                        {savedKanji.find((k) => k.kanji === currentKanji.kanji)
                          ? "즐겨찾기 해제"
                          : "즐겨찾기 추가"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">한자를 터치하세요</div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="text-2xl text-gray-400">😔</div>
                <div className="text-gray-500">
                  이 레벨의 한자 데이터가 아직 준비되지 않았습니다.
                </div>
                <button
                  onClick={() => setCurrentScreen("main")}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm"
                >
                  메인으로 돌아가기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        {kanjiList.length > 0 && (
          <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-4 px-4">
            <button
              onClick={prevKanji}
              disabled={currentKanjiIndex === 0}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded">
              <MoreVertical size={20} />
            </button>
            <button
              onClick={nextKanji}
              disabled={currentKanjiIndex === kanjiList.length - 1}
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* 진도 슬라이더 */}
        {kanjiList.length > 0 && (
          <div className="fixed top-32 left-4 right-4">
            <div className="bg-white rounded-lg border border-gray-200 px-4 py-2 shadow-sm">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>1</span>
                <span className="font-medium text-red-600">
                  {currentKanjiIndex + 1} / {kanjiList.length}
                </span>
                <span>{kanjiList.length}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={kanjiList.length - 1}
                  value={currentKanjiIndex}
                  onChange={handleSliderChange}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ff0000ff 0%, #ffffffff ${
                      kanjiList.length > 1
                        ? (currentKanjiIndex / (kanjiList.length - 1)) * 100
                        : 0
                    }%, #e5e7eb ${
                      kanjiList.length > 1
                        ? (currentKanjiIndex / (kanjiList.length - 1)) * 100
                        : 0
                    }%, #e5e7eb 100%)`,
                  }}
                />
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                    input[type="range"]::-webkit-slider-thumb {
                      appearance: none;
                      height: 16px;
                      width: 16px;
                      border-radius: 50%;
                      background: #ff0000ff;
                      cursor: pointer;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    }
                    input[type="range"]::-moz-range-thumb {
                      height: 16px;
                      width: 16px;
                      border-radius: 50%;
                      background: #ff0000ff;
                      cursor: pointer;
                      border: none;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    }
                  `,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-7">
          <button
            onClick={() => setCurrentScreen("main")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">시작</div>
          </button>
          <button className="flex-1 p-3 text-center text-red-500">
            <div className="text-xs">학습</div>
          </button>
          <button className="flex-1 p-3 text-center text-gray-600">
            <div className="text-xs">검색</div>
          </button>
          <button
            onClick={() => setCurrentScreen("saved")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">내 한자</div>
          </button>
        </div>
      </div>
    );
  }

  // 내 한자 화면
  if (currentScreen === "saved") {
    const sortedKanji = getSortedSavedKanji();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-orange-400 text-white p-4 text-center">
          <h1 className="text-lg font-bold">내 한자</h1>
          <div className="text-xs">일본어 상용한자 외우기</div>
        </div>

        {/* 정렬 옵션 */}
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm">총 {savedKanji.length}자</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy("difficulty")}
                className={`px-3 py-1 rounded text-xs ${
                  sortBy === "difficulty"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                난이도순
              </button>
              <button
                onClick={() => setSortBy("registration")}
                className={`px-3 py-1 rounded text-xs ${
                  sortBy === "registration"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                등록순
              </button>
              <button
                onClick={() => setSortBy("random")}
                className={`px-3 py-1 rounded text-xs ${
                  sortBy === "random" ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
              >
                랜덤
              </button>
            </div>
          </div>
        </div>

        {/* 한자 목록 */}
        <div className="p-4 space-y-2">
          {sortedKanji.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              저장된 한자가 없습니다.
            </div>
          ) : (
            sortedKanji.map((kanji, index) => (
              <div
                key={`${kanji.kanji}-${index}`}
                className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between"
                onContextMenu={(e) => handleContextMenu(e, kanji.kanji)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-red-600">
                    {kanji.kanji}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{kanji.meaning}</div>
                    <div className="text-xs text-gray-500">
                      ({getKanjiLevel(kanji.kanji)})
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromSaved(kanji.kanji)}
                  className="text-yellow-500 hover:text-red-500 transition-colors duration-200"
                  title="즐겨찾기에서 제거"
                >
                  <Star
                    className="text-yellow-500 hover:text-red-500"
                    size={16}
                    fill="currentColor"
                  />
                </button>
              </div>
            ))
          )}
        </div>

        {/* 컨텍스트 메뉴 */}
        {contextMenu.show && (
          <div
            className="fixed bg-white border border-gray-300 rounded shadow-lg z-50 py-2"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={() => copyKanji(contextMenu.kanji)}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 w-full text-left"
            >
              <Copy size={16} />
              <span>복사</span>
            </button>
            <button
              onClick={() => searchKanji(contextMenu.kanji)}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 w-full text-left"
            >
              <ExternalLink size={16} />
              <span>한자사전 검색</span>
            </button>
            <button
              onClick={() => {
                removeFromSaved(contextMenu.kanji);
                setContextMenu({ show: false, kanji: null, x: 0, y: 0 });
              }}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 w-full text-left text-red-600"
            >
              <Star size={16} />
              <span>즐겨찾기에서 제거</span>
            </button>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex h-7">
          <button
            onClick={() => setCurrentScreen("main")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">시작</div>
          </button>
          <button
            onClick={() => setCurrentScreen("study")}
            className="flex-1 p-3 text-center text-gray-600"
          >
            <div className="text-xs">학습</div>
          </button>
          <button className="flex-1 p-3 text-center text-gray-600">
            <div className="text-xs">검색</div>
          </button>
          <button className="flex-1 p-3 text-center text-orange-500">
            <div className="text-xs">내 한자</div>
          </button>
        </div>
        <Analytics />
      </div>
    );
  }

  return null;
};

export default KanjiLearningApp;
