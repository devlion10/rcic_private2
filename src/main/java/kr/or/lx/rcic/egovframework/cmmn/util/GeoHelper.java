package kr.or.lx.rcic.egovframework.cmmn.util;

public class GeoHelper {
	
	static final double kEarthRadiusKms = 6376.5;


    public static double getDistanceBetweenGps(double lat1, double lon1, double lat2, double lon2) {
        return getDistanceBetween(lon1, lat1, lon2, lat2);
    }

    public static double getDistanceBetween(double x1, double y1, double x2, double y2) {     
    		double lat1_rad = y1 * (Math.PI / 180.0);
            double lng1_rad = x1 * (Math.PI / 180.0);
            double lat2_rad = y2 * (Math.PI / 180.0);
            double lng2_rad = x2 * (Math.PI / 180.0);

            double lat_gap = lat2_rad - lat1_rad;
            double lng_gap = lng2_rad - lng1_rad;
            
            double mid_val = Math.pow(Math.sin(lat_gap / 2.0), 2.0) +
                             Math.cos(lat1_rad) * 
                             Math.cos(lat2_rad) *
                             Math.pow(Math.sin(lng_gap / 2.0), 2.0);

            double circle_distance = 2.0 * Math.atan2(Math.sqrt(mid_val), Math.sqrt(1.0 - mid_val));
            double distance = kEarthRadiusKms * circle_distance * 1000; 
            
        return distance;
    }

}
