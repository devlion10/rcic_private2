package kr.or.lx.rcic.frmwrk.util;

import kr.or.lx.rcic.egovframework.cmmn.model.ModelStringUtil;
import kr.or.lx.rcic.egovframework.cmmn.model.ModelUnicodeUtil;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.*;

@Slf4j
@SuppressWarnings("serial")
public class SimpleMultiData extends SimpleDataProtocol
{

    public SimpleMultiData(String name)
    {
        field_index = 0;
        entityKey = null;
        this.name = name;
    }

    public SimpleMultiData(int initialCapacity, float loadFactor)
    {
        super(initialCapacity, loadFactor);
        field_index = 0;
        entityKey = null;
    }

    public SimpleMultiData(int initialCapacity)
    {
        super(initialCapacity);
        field_index = 0;
        entityKey = null;
    }

    public SimpleMultiData()
    {
        field_index = 0;
        entityKey = null;
    }

    @SuppressWarnings("unchecked")
	public SimpleMultiData(Map m)
    {
        super(m);
        field_index = 0;
        entityKey = null;
    }

    public SimpleMultiData(int initialCapacity, float loadFactor, boolean accessOrder)
    {
        super(initialCapacity, loadFactor, accessOrder);
        field_index = 0;
        entityKey = null;
    }

    @SuppressWarnings("unchecked")
	public void modify(Object key, int index, Object replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, replaceValue);
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void modifyInt(Object key, int index, int replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, new Integer(replaceValue));
            return;
        }
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
	public void modifyString(Object key, int index, String replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, replaceValue);
            return;
        }
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
	public void modifyDouble(Object key, int index, double replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, new Double(replaceValue));
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void modifyFloat(Object key, int index, float replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, new Float(replaceValue));
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void modifyLong(Object key, int index, long replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, new Long(replaceValue));
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void modifyShort(Object key, int index, short replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, new Short(replaceValue));
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void modifyBoolean(Object key, int index, boolean replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, new Boolean(replaceValue));
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void modifyBigDecimal(Object key, int index, BigDecimal replaceValue)
    {
        if(!super.containsKey(key))
        {
            log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
        }
        ArrayList arrayList = (ArrayList)get(key);
        int valueSize = arrayList.size();
        if(valueSize <= index)
        {
            log.info("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData ");
            throw new RuntimeException("Index(" + index + ") of Key(" + key + ") exceeds size(" + (valueSize - 1) + ") of LMultiData");
        } else
        {
            arrayList.set(index, replaceValue);
            return;
        }
    }

    @SuppressWarnings("unchecked")
	public void add(Object key, Object value)
    {
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(value);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(value);
        }
    }

    @SuppressWarnings("unchecked")
	public void addString(Object key, String value)
    {
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(value);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(value);
        }
    }

    @SuppressWarnings("unchecked")
	public void addInt(Object key, int value)
    {
        Integer valueInt = new Integer(value);
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(valueInt);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(valueInt);
        }
    }

    @SuppressWarnings("unchecked")
	public void addDouble(Object key, double value)
    {
        Double valueDouble = new Double(value);
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(valueDouble);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(valueDouble);
        }
    }

    @SuppressWarnings("unchecked")
	public void addFloat(Object key, float value)
    {
        Float valueFloat = new Float(value);
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(valueFloat);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(valueFloat);
        }
    }

    @SuppressWarnings("unchecked")
	public void addLong(Object key, long value)
    {
        Long valueLong = new Long(value);
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(valueLong);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(valueLong);
        }
    }

    @SuppressWarnings("unchecked")
	public void addShort(Object key, short value)
    {
        Short valueShort = new Short(value);
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(valueShort);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(valueShort);
        }
    }

    @SuppressWarnings("unchecked")
	public void addBoolean(Object key, boolean value)
    {
        Boolean valueBoolean = new Boolean(value);
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(valueBoolean);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(valueBoolean);
        }
    }

    @SuppressWarnings("unchecked")
	public void addBigDecimal(Object key, BigDecimal value)
    {
        if(!super.containsKey(key))
        {
            ArrayList arrayList = new ArrayList();
            arrayList.add(value);
            super.put(key, arrayList);
        } else
        {
            ArrayList arrayList = (ArrayList)super.get(key);
            arrayList.add(value);
        }
    }

    public BigDecimal getBigDecimal(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            return new BigDecimal(0.0D);
        else
            return (BigDecimal)o;
    }

    @SuppressWarnings("unchecked")
	private Object getObject(Object key, int index)
    {
        Object o = null;
        ArrayList arrayList = (ArrayList)super.get(key);
        if(arrayList == null)
            if(nullToInitialize)
            {
                return null;
            } else
            {
                log.info("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
                throw new RuntimeException("Key(" + key + ") does not exist in LMultiData(" + name + ") ");
            }
        try
        {
            if(index >= arrayList.size())
                return null;
            o = arrayList.get(index);
        }
        catch(IndexOutOfBoundsException ioe)
        {
            log.info("Index(" + index + ") in LMultiData(" + name + ") is out of Bounds.");
            throw new RuntimeException("Index(" + index + ") in LMultiData(" + name + ") is out of Bounds.");
        }
        return o;
    }

    public Object get(Object key, int index)
    {
        return getObject(key, index);
    }

    @SuppressWarnings("unchecked")
	public int getInt(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            if(isNullToInitialize())
                return 0;
            else
                throw new RuntimeException("Value of the Key(" + key + ") is null");
        Class classType = o.getClass();
        if(classType == Integer.class)
            return ((Integer)o).intValue();
        if(classType == Short.class)
            return ((Short)o).shortValue();
        if(classType == String.class)
        {
            try
            {
                return Integer.parseInt(o.toString());
            }
            catch(Exception e)
            {
                log.info("Value of the Key(" + key + ") Type(int) does not match : It's type is not int");
            }
            throw new RuntimeException("Value of the Key(" + key + ") Type(int) does not match : It's type is not int");
        } else
        {
            log.info("Value of the Key(" + key + ") Type(int) does not match : It's type is not int");
            throw new RuntimeException("Value of the Key(" + key + ") Type(int) does not match : It's type is not int");
        }
    }

    @SuppressWarnings("unchecked")
	public double getDouble(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            if(isNullToInitialize())
                return 0.0D;
            else
                throw new RuntimeException("Value of the Key(" + key + ") is null");
        Class classType = o.getClass();
        if(classType == Double.class)
            return ((Double)o).doubleValue();
        if(classType == Float.class)
            return (double)((Float)o).floatValue();
        if(classType == String.class || classType == BigDecimal.class)
        {
            try
            {
                return Double.parseDouble(o.toString());
            }
            catch(Exception e)
            {
                log.info("Value of the Key(" + key + ") Type(double) does not match : It's type is not double");
            }
            throw new RuntimeException("Value of the Key(" + key + ") Type(double) does not match : It's type is not double");
        } else
        {
            log.info("Value of the Key(" + key + ")  Type(double) does not match : It's type is not double");
            throw new RuntimeException("Value of the Key(" + key + ")  Type(double) does not match : It's type is not double");
        }
    }

    @SuppressWarnings("unchecked")
	public float getFloat(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            if(isNullToInitialize())
                return 0.0F;
            else
                throw new RuntimeException("Value of the Key(" + key + ") is null");
        Class classType = o.getClass();
        if(classType == Float.class)
            return ((Float)o).floatValue();
        if(classType == String.class || classType == BigDecimal.class)
        {
            try
            {
                return Float.parseFloat(o.toString());
            }
            catch(Exception e)
            {
                log.info("Value of the Key(" + key + ") Type(float) does not match : It's type is not float");
            }
            throw new RuntimeException("Value of the Key(" + key + ") Type(float) does not match : It's type is not float");
        } else
        {
            log.info("Value of the Key(" + key + ") Type(float) does not match : It's type is not float");
            throw new RuntimeException("Value of the Key(" + key + ") Type(float) does not match : It's type is not float");
        }
    }

    @SuppressWarnings("unchecked")
	public long getLong(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            if(isNullToInitialize())
                return 0L;
            else
                throw new RuntimeException("Value of the Key(" + key + ") is null");
        Class classType = o.getClass();
        if(classType == Long.class)
            return ((Long)o).longValue();
        if(classType == Integer.class)
            return (long)((Integer)o).intValue();
        if(classType == Short.class)
            return (long)((Short)o).shortValue();
        if(classType == String.class)
        {
            try
            {
                return Long.parseLong(o.toString());
            }
            catch(Exception e)
            {
                log.info("Value of the Key(" + key + ") Type(long) does not match : It's type is not long");
            }
            throw new RuntimeException("Value of the Key(" + key + ") Type(long) does not match : It's type is not long");
        } else
        {
            log.info("Value of the Key(" + key + ") Type(long) does not match : It's type is not long");
            throw new RuntimeException("Value of the Key(" + key + ") Type(long) does not match : It's type is not long");
        }
    }

    @SuppressWarnings("unchecked")
	public short getShort(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            if(isNullToInitialize())
                return 0;
            else
                throw new RuntimeException("Value of the Key(" + key + ")  is null");
        Class classType = o.getClass();
        if(classType == Short.class)
            return ((Short)o).shortValue();
        if(classType == String.class)
        {
            try
            {
                return Short.parseShort(o.toString());
            }
            catch(Exception e)
            {
                log.info("Key(" + key + ")" + " Type(short) does not match : It's type is not short");
            }
            throw new RuntimeException("Value of the Key(" + key + ") Type(short) does not match : It's type is not short");
        } else
        {
            log.info("Key(" + key + ")" + " Type(short) does not match : It's type is not short");
            throw new RuntimeException("Value of the Key(" + key + ") Type(short) does not match : It's type is not short");
        }
    }

    @SuppressWarnings("unchecked")
	public boolean getBoolean(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
            if(isNullToInitialize())
                return false;
            else
                throw new RuntimeException("Value of the Key(" + key + ") is null");
        Class classType = o.getClass();
        if(classType == Boolean.class)
            return ((Boolean)o).booleanValue();
        if(classType == String.class)
        {
            try
            {
                return Boolean.getBoolean(o.toString());
            }
            catch(Exception e)
            {
                log.info("Value of the Key(" + key + ") Type(short) does not match : It's type is not short");
            }
            throw new RuntimeException("Value of the Key(" + key + ") Type(short) does not match : It's type is not short");
        } else
        {
            log.info("Value of the Key(" + key + ") Type(short) does not match : It's type is not short");
            throw new RuntimeException("Value of the Key(" + key + ") Type(short) does not match : It's type is not short");
        }
    }

    public String getString(Object key, int index)
    {
        Object o = getObject(key, index);
        if(o == null)
        {
            if(isNullToInitialize())
                return "";
            else
                return null;
        } else
        {
            return o.toString();
        }
    }

    @SuppressWarnings("unchecked")
	public Object remove(Object key, int index)
    {
        if(super.containsKey(key))
            return ((ArrayList)super.get(key)).remove(index);
        else
            return null;
    }

    @SuppressWarnings("unchecked")
	public int keySize(Object key)
    {
        if(super.containsKey(key))
            return ((ArrayList)super.get(key)).size();
        else
            return 0;
    }

    @SuppressWarnings("unchecked")
	public int keySize()
    {
        Set tempSet = super.keySet();
        Iterator iterator = tempSet.iterator();
        if(iterator.hasNext())
        {
            String key = iterator.next().toString();
            return ((ArrayList)super.get(key)).size();
        } else
        {
            return 0;
        }
    }

    @SuppressWarnings("unchecked")
	public SimpleData getSimpleData(int index)
    {
        SimpleData singleData = new SimpleData("");
        Set tempSet = super.keySet();
        String key;
        Object o;
        for(Iterator iterator = tempSet.iterator(); iterator.hasNext(); singleData.put(key, o))
        {
            key = iterator.next().toString();
            o = getObject(key, index);
        }

        return singleData;
    }

    @SuppressWarnings("unchecked")
	public SimpleData getSimpleData(String dataName, int index)
    {
        SimpleData singleData = new SimpleData(dataName);
        String prefix = dataName + ".";
        Set tempSet = super.keySet();
        for(Iterator iterator = tempSet.iterator(); iterator.hasNext();)
        {
            String key = iterator.next().toString();
            int key_index = key.indexOf(".");
            String realKey = key.substring(key_index + 1);
            if(key.startsWith(prefix))
            {
                Object o = getObject(key, index);
                singleData.put(realKey, o);
            }
        }

        return singleData;
    }

    @SuppressWarnings("unchecked")
	public void addSimpleData(SimpleData data)
    {
        Set tempSet = data.keySet();
        for(Iterator iterator = tempSet.iterator(); iterator.hasNext();)
        {
            Object key = iterator.next();
            if(containsKey(key))
            {
                int field_size = ((ArrayList)get(key)).size();
                if(field_size != field_index)
                {
                    for(int inx = field_size; inx < field_index; inx++)
                        add(key, null);

                }
                add(key, data.get(key));
            } else
            {
                for(int inx = 0; inx < field_index; inx++)
                    add(key, null);

                add(key, data.get(key));
            }
        }

        field_index++;
    }

    @SuppressWarnings("unchecked")
	public void addSimpleData(String dataName, SimpleData data)
    {
        int entitySize = 0;
        if(entityKey == null)
            entityKey = new HashMap(5);
        else
        if(entityKey.containsKey(dataName))
            entitySize = ((Integer)entityKey.get(dataName)).intValue();
        Set tempSet = data.keySet();
        for(Iterator iterator = tempSet.iterator(); iterator.hasNext();)
        {
            Object key = iterator.next();
            String dataKey = dataName + "." + key;
            if(containsKey(dataKey))
            {
                int fieldSize = ((ArrayList)get(dataKey)).size();
                if(fieldSize != entitySize)
                {
                    for(int inx = fieldSize; inx < entitySize; inx++)
                        add(dataKey, null);

                }
                add(dataKey, data.get(key));
            } else
            {
                for(int inx = 0; inx < entitySize; inx++)
                    add(dataKey, null);

                add(dataKey, data.get(key));
            }
        }

        entityKey.put(dataName, new Integer(entitySize + 1));
    }

    @SuppressWarnings("unchecked")
	public String toString()
    {
        boolean checkLongString = true;
        StringBuffer buf = new StringBuffer();
        Set keySet = keySet();
        int keySize = keySet.size();
        String keyStr[] = new String[keySize];
        keySet.toArray(keyStr);
        buf.append(" [SimpleMultiData]-------------");
        buf.append(ModelStringUtil.makeRepeatString("-", (keySize - 1) * 23 - 1));
        buf.append("|");
        buf.append("\n |{index}| ");
        for(int keyLoopNumber = 0; checkLongString; keyLoopNumber++)
        {
            checkLongString = false;
            for(int inx = 0; inx < keySize; inx++)
            {
                int keyLength = keyStr[inx].length();
                int printKeyLength = 0;
                if(keyLength > (keyLoopNumber + 1) * 20)
                {
                    printKeyLength = (keyLoopNumber + 1) * 20;
                    checkLongString = true;
                } else
                if(keyLoopNumber == 0 || keyLength > keyLoopNumber * 20)
                    printKeyLength = keyLength;
                else
                    printKeyLength = 0;
                if(printKeyLength != 0)
                    buf.append(keyStr[inx].substring(keyLoopNumber * 20, printKeyLength));
                if(printKeyLength != 0 && printKeyLength % 20 == 0)
                    printKeyLength = 20;
                else
                    buf.append(ModelStringUtil.makeRepeatString(" ", 20 - printKeyLength % 20));
                buf.append(" | ");
            }

            if(!checkLongString)
                break;
            buf.append("\n |       | ");
        }

        buf.append("\n |-------------------------------");
        buf.append(ModelStringUtil.makeRepeatString("-", (keySize - 1) * 23 - 1));
        buf.append("|");
        int rowSize = 0;
        for(int inx = 0; inx < keySize; inx++)
        {
            int rowSizeOfKey = keySize(keyStr[inx]);
            if(rowSizeOfKey > rowSize)
                rowSize = rowSizeOfKey;
        }

        for(int inx = 0; inx < rowSize; inx++)
        {
            buf.append("\n |  ");
            String indexStr = inx+""; // 2008 10 23 kmh
            buf.append(indexStr);
            buf.append(ModelStringUtil.makeRepeatString(" ", 5 - indexStr.length()));
            buf.append("| ");
            checkLongString = true;
            for(int lineLoopNumber = 0; checkLongString; lineLoopNumber++)
            {
                checkLongString = false;
                for(int jnx = 0; jnx < keySize; jnx++)
                {
                    String tmpValue = getString(keyStr[jnx], inx);
                    if(tmpValue == null)
                        tmpValue = "null";
                    int uniCode[] = ModelUnicodeUtil.getUnicodeLineArray(tmpValue, 20);
                    int valueLength = tmpValue.getBytes().length;
                    int printValueLength = 0;
                    int lastUnicodeNumber = 0;
                    int beforeLastUnicodeNumber = 0;
                    String printString = "";
                    for(int knx = 0; knx < uniCode.length; knx++)
                        if(uniCode[knx] <= lineLoopNumber + 1)
                            lastUnicodeNumber++;

                    for(int knx = 0; knx < uniCode.length; knx++)
                        if(uniCode[knx] <= lineLoopNumber)
                            beforeLastUnicodeNumber++;

                    if(valueLength + lastUnicodeNumber > (lineLoopNumber + 1) * 20)
                    {
                        printValueLength = (lineLoopNumber + 1) * 20 - lastUnicodeNumber;
                        checkLongString = true;
                        if(lineLoopNumber == 0)
                        {
                            printString = new String(tmpValue.getBytes(), lineLoopNumber * 20, printValueLength - lineLoopNumber * 20);
                            buf.append(printString);
                        } else
                        {
                            printValueLength += beforeLastUnicodeNumber;
                            printString = new String(tmpValue.getBytes(), lineLoopNumber * 20 - beforeLastUnicodeNumber, printValueLength - lineLoopNumber * 20);
                            buf.append(printString);
                        }
                    } else
                    if(lineLoopNumber == 0 || valueLength + lastUnicodeNumber > lineLoopNumber * 20)
                    {
                        printValueLength = valueLength;
                        if(lineLoopNumber == 0)
                        {
                            printString = new String(tmpValue.getBytes(), lineLoopNumber * 20, (printValueLength - lineLoopNumber * 20) + lastUnicodeNumber);
                            buf.append(printString);
                        } else
                        {
                            printValueLength += lastUnicodeNumber;
                            printString = new String(tmpValue.getBytes(), lineLoopNumber * 20 - lastUnicodeNumber, printValueLength - lineLoopNumber * 20);
                            buf.append(printString);
                        }
                    } else
                    {
                        printValueLength = 0;
                    }
                    if(printValueLength != 0 && printValueLength % 20 == 0)
                    {
                        printValueLength = 20;
                        int unicodeNumber = ModelUnicodeUtil.countUnicode(printString);
                        buf.append(ModelStringUtil.makeRepeatString(" ", unicodeNumber));
                    } else
                    {
                        int unicodeNumber = ModelUnicodeUtil.countUnicode(printString);
                        buf.append(ModelStringUtil.makeRepeatString(" ", unicodeNumber));
                        if(printString.length() != 0 && ModelUnicodeUtil.isUnicode(printString.charAt(printString.length() - 1)))
                            buf.append(ModelStringUtil.makeRepeatString(" ", 20 - printValueLength % 20));
                        buf.append(ModelStringUtil.makeRepeatString(" ", 20 - printValueLength % 20));
                    }
                    buf.append(" | ");
                }

                if(!checkLongString)
                    break;
                buf.append("\n |       | ");
            }

            buf.append("\n |-------------------------------");
            buf.append(ModelStringUtil.makeRepeatString("-", (keySize - 1) * 23 - 1));
            buf.append("|");
        }

        buf.append("\n [Total Row Size] = ");
        buf.append(rowSize);
        return buf.toString();
    }

    private int field_index;
    @SuppressWarnings("unchecked")
	HashMap entityKey;
}