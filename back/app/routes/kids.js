const express = require("express");
const path = require("path");
const router = express.Router();

const kidsController = require(path.join(__dirname, "..", "controllers", "kids"));
const profile = require(path.join(__dirname, "..", "utils", "profile"));

/**
 * @swagger
 * paths:
 *  /kids/register:
 *    post:
 *      summary: "자녀 등록"
 *      description: "post 방식으로 자녀 등록"
 *      tags: [Kids]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (자녀 등록)
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  kidName:
 *                    type: string
 *                    description: "아이 이름"
 *                  kidBirth:
 *                    type: string
 *                    format: date
 *                    description: "아이 생년월일"
 *                  kidGender:
 *                    type: string
 *                    description: "아이 성별(남-'M', 여-'F')"
 *                  kidProfile:
 *                    type: file
 *                    description: "아이 사진"
 *                  userNo:
 *                    type: integer
 *                    description: "회원 번호(부모)"
 *      responses:
 *        "200":
 *          description: 아이 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "아이 등록 완료"
 *                    kid_no:
 *                      type: integer
 *                      description: "아이 번호"
 *
 *        "500":
 *          description: 아이 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "아이 등록 실패"
 */
router.post("/register", profile.single("kidProfile"), kidsController.kid_regist);

/**
 * @swagger
 * paths:
 *  /kids/register:
 *    put:
 *      summary: "자녀 유치원 등록"
 *      description: "put 방식으로 자녀의 유치원 등록"
 *      tags: [Kids]
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (자녀 등록)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidNo:
 *                    type: integer
 *                    description: "아이 번호"
 *                  centerNo:
 *                    type: integer
 *                    description: "유치원 번호"
 *      responses:
 *        "200":
 *          description: 아이 유치원 등록 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 등록 완료, 승인 대기 상태"
 *        "400":
 *          description: 아이 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "요청 오류 발생"
 *        "500":
 *          description: 아이 등록 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "유치원 등록 실패"
 */
router.put("/register", kidsController.kid_center_regist);

/**
 * @swagger
 * paths:
 *  /kids/list/{groupNo}:
 *    get:
 *      summary: "반별 원생 목록 조회"
 *      description: "get 방식으로 반별 원생 목록 조회"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: groupNo
 *          required: true
 *          description: 반 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 반별 원생 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"kid_no": 1, "kid_name": "이키즈","kid_profile_url": null},
 *                     {"kid_no": 2,"kid_name": "유키즈","kid_profile_url": null},
 *                     {"kid_no": 3, "kid_name": "유희왕","kid_profile_url": null}]
 *        "500":
 *          description: 반별 원생 목록 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "목록 조회 과정에 문제 발생"
 */
router.get("/list/:groupNo", kidsController.kid_class_list);

/**
 * @swagger
 * paths:
 *  /kids/list/parent/{userNo}:
 *    get:
 *      summary: "부모별 아이 목록 조회"
 *      description: "get 방식으로 부모별 아이 목록 조회"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: userNo
 *          required: true
 *          description: 부모 회원 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 부모별 아이 목록 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                    [{"아이1": "아이정보2"},
 *                     {"아이2": "아이정보2"},]
 *        "500":
 *          description: 반별 원생 목록 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "목록 조회 과정에 문제 발생"
 */
router.get("/list/parent/:userNo", kidsController.kid_parent_list);

/**
 * @swagger
 * paths:
 *  /kids/{kidNo}:
 *    get:
 *      summary: "아이 정보 조회"
 *      description: "get 방식으로 아이 정보 조회"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 아이 정보 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  kid_no:
 *                    type: integer
 *                    example: 1
 *                  kid_name:
 *                    type: string
 *                    example: "이키즈"
 *                  kid_birth:
 *                    type: string
 *                    format: date
 *                    example: "2017-09-19"
 *                  kid_gender:
 *                    type: string
 *                    example: "F"
 *                  kid_stamp:
 *                    type: integer
 *                    example: 0
 *                  kid_profile_url:
 *                    type: string
 *                    example: "/uploads/profile/1660205087717.png"
 *                  kid_memo:
 *                    type: string
 *                    example: "자동차 장난감을 좋아한다."
 *                  kid_state:
 *                    type: string
 *                    example: "0"
 *                  parents_no:
 *                    type: integer
 *                    example: 43,
 *                  group_no:
 *                    type: integer
 *                    example: 21
 *                  center_no:
 *                    type: integer
 *                    example: 1
 *        "400":
 *          description: 아이 정보 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "해당 정보를 찾을 수 없습니다."
 */
router.get("/:kidNo", kidsController.kid_detail);

/**
 * @swagger
 * paths:
 *  /kids/{kidNo}:
 *    put:
 *      summary: "아이 정보 수정"
 *      description: "put 방식으로 아이 정보 수정"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (아이 정보 수정)
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  kidBirth:
 *                    type: string
 *                    format: date
 *                    description: "아이 생년월일"
 *                  kidGender:
 *                    type: string
 *                    description: "아이 성별(남-'M', 여-'F')"
 *                  kidProfile:
 *                    type: file
 *                    description: "아이 프로필 사진"
 *      responses:
 *        "200":
 *          description: 정보 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "정보 수정 완료"
 *
 *        "400":
 *          description: 정보 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "요청 실패"
 *        "500":
 *          description: 서버 오류 발생
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "서버 오류 발생"
 */
router.put("/:kidNo", profile.single("kidProfile"), kidsController.kid_update);

/**
 * @swagger
 * paths:
 *  /kids/{kidNo}:
 *    put:
 *      summary: "아이 정보 수정"
 *      description: "put 방식으로 아이 정보 수정"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *      requestBody:
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (아이 정보 수정)
 *          required: true
 *          content:
 *            application/x-www-form-urlencoded:
 *              schema:
 *                type: object
 *                properties:
 *                  kidMemo:
 *                    type: string
 *                    description: "원생 메모"
 *      responses:
 *        "200":
 *          description: 원생 메모 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "원생 메모 수정 완료"
 *
 *        "400":
 *          description: 원생 메모 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "요청 실패"
 *        "500":
 *          description: 서버 오류 발생
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "서버 오류 발생"
 */
router.put("/memos/:kidNo", kidsController.kid_update_memo);

/**
 * @swagger
 * paths:
 *  /kids/attendance/{kidNo}/{kidState}:
 *    put:
 *      summary: "아이 등원 상태 정보 수정"
 *      description: "put 방식으로 아이 등원 상태 정보 수정"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *        - in: path
 *          name: kidState
 *          required: true
 *          description: 아이 등원상태
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 정보 수정 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "정보 수정 완료"
 *
 *        "400":
 *          description: 정보 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "요청 실패"
 *        "500":
 *          description: 서버 오류 발생
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "서버 오류 발생"
 */
router.put("/attendance/:kidNo/:kidState", kidsController.kid_update_attendance);

/**
 * @swagger
 * paths:
 *  /kids/{kidNo}:
 *    delete:
 *      summary: "아이 정보 삭제"
 *      description: "delete 방식으로 아이 정보 삭제"
 *      tags: [Kids]
 *      parameters:
 *        - in: path
 *          name: kidNo
 *          required: true
 *          description: 아이 번호
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: 아이 정보 삭제 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "아이 정보 삭제 완료"
 *        "400":
 *          description: 아이 정보 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "아이 정보 삭제 실패"
 *        "500":
 *          description: 서버 오류 발생
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    message:
 *                      type: string
 *                      example:
 *                          "서버 오류 발생"
 */
router.delete("/:kidNo", kidsController.kid_remove);

module.exports = router;
