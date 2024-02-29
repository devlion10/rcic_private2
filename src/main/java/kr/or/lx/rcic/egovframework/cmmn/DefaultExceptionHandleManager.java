/*
 * Copyright 2008-2009 MOPAS(Ministry of Public Administration and Security).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kr.or.lx.rcic.egovframework.cmmn;

import egovframework.rte.fdl.cmmn.exception.handler.ExceptionHandler;
import egovframework.rte.fdl.cmmn.exception.manager.AbstractExceptionHandleManager;
import egovframework.rte.fdl.cmmn.exception.manager.ExceptionHandlerService;
import lombok.extern.slf4j.Slf4j;

/**
 * DefaultExceptionHandleManager.
 *
 * <p>디폴트 ExceptionHandleManager
 * 사용자에 의해 구현시 참고하여 구현해주면 된다.</p>
 *
 * @author Judd Cho (horanghi@gmail.com)
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.05.30  Judd Cho        최초 생성
 *   2015.01.31 Vincent Han		코드 품질 개선 
 *
 * </pre>
 */
@Slf4j
public class DefaultExceptionHandleManager extends AbstractExceptionHandleManager implements ExceptionHandlerService {


	@Override
	public boolean run(Exception exception) throws Exception {

		log.debug(" DefaultExceptionHandleManager.run() ");

		// 매칭조건이 false 인 경우
		if (!enableMatcher()) {
			return false;
		}

		for (String pattern : patterns) {
			log.debug("pattern = {}, thisPackageName = {}", pattern, thisPackageName);
			log.debug("pm.match(pattern, thisPackageName) = {}", pm.match(pattern, thisPackageName));
			if (pm.match(pattern, thisPackageName)) {
				for (ExceptionHandler eh : handlers) {
					eh.occur(exception, getPackageName());
				}
				break;
			}
		}
		return true;
	}

}
